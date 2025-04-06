import config from '@telecom/config';
import logger from '@telecom/logger';
import * as fs from 'fs';
import * as path from 'path';
import { Client } from 'pg';

async function createDatabaseIfNotExists(database: string) {
  const client = new Client({
    host: config.postgres.host,
    port: config.postgres.port,
    user: config.postgres.username,
    password: config.postgres.password,
    database: 'postgres',
  });

  try {
    await client.connect();
    logger.info(`Connected to postgres database`);

    const { rows } = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [database]);

    if (rows.length === 0) {
      logger.info(`Creating database: ${database}`);
      await client.query(`CREATE DATABASE ${database}`);
      logger.info(`Database ${database} created successfully`);
    } else {
      logger.info(`Database ${database} already exists`);
    }
  } catch (error) {
    logger.error(`Error creating database:`, error);
    throw error;
  } finally {
    await client.end();
  }
}

async function runMigrations() {
  await createDatabaseIfNotExists(config.postgres.apiDatabase);

  const client = new Client({
    host: config.postgres.host,
    port: config.postgres.port,
    user: config.postgres.username,
    password: config.postgres.password,
    database: config.postgres.apiDatabase,
  });

  try {
    await client.connect();
    logger.info(`Connected to ${config.postgres.apiDatabase} database`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const migrationsDir = path.join(__dirname, 'migrations');
    if (!fs.existsSync(migrationsDir)) {
      logger.info(`No migrations found`);
      return;
    }

    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith('.sql'))
      .sort();

    const { rows: executedMigrations } = await client.query('SELECT name FROM migrations');
    const executedMigrationNames = new Set(
      executedMigrations.map((row: { name: string }) => row.name),
    );

    for (const file of migrationFiles) {
      if (!executedMigrationNames.has(file)) {
        logger.info(`Running migration: ${file}`);
        const migrationContent = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');

        await client.query('BEGIN');
        try {
          await client.query(migrationContent);
          await client.query('INSERT INTO migrations (name) VALUES ($1)', [file]);
          await client.query('COMMIT');
          logger.info(`Migration ${file} completed successfully`);
        } catch (error) {
          await client.query('ROLLBACK');
          logger.error(`Error running migration ${file}:`, error);
          throw error;
        }
      }
    }

    logger.info(`All migrations completed`);
  } catch (error) {
    logger.error(`Migration error:`, error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations().catch(logger.error);
