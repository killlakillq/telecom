import logger from '@telecom/logger';
import { Pool, PoolClient } from 'pg';

import config from '@telecom/config';

export class Database {
  private pool: Pool;
  private client: PoolClient;

  public constructor() {
    this.pool = new Pool({
      host: config.postgres.host,
      port: config.postgres.port,
      user: config.postgres.username,
      password: config.postgres.password,
      database: config.postgres.database,
    });
  }

  public async getClient(): Promise<PoolClient> {
    if (!this.client) {
      await this.connect();
    }

    return this.client;
  }

  public async connect(): Promise<void> {
    try {
      this.client = await this.pool.connect();
      logger.info('Connected to PostgreSQL database');
    } catch (error) {
      logger.error({ error }, 'Error connecting to database');
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    this.client.release();
    this.client = null;
    await this.pool.end();
  }
}
