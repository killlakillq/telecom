import { Pool, PoolClient } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface TelephonyEvent {
  eventType: string;
  eventData: Record<string, any>;
  channelId?: string;
  callerId?: string;
  calledNumber?: string;
  duration?: number;
  queueName?: string;
  agentName?: string;
}

export class DatabaseClient {
  private pool: Pool;
  private client: PoolClient | null = null;

  constructor(private config: DatabaseConfig) {
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database
    });
  }

  async connect(): Promise<void> {
    try {
      this.client = await this.pool.connect();
      await this.initializeDatabase();
      console.log('Connected to PostgreSQL database');
    } catch (error) {
      console.error('Error connecting to database:', error);
      throw error;
    }
  }

  private async initializeDatabase(): Promise<void> {
    if (!this.client) throw new Error('Database client not initialized');

    try {
      // Read and execute schema.sql
      const schemaPath = path.join(__dirname, 'schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      await this.client.query(schema);
      console.log('Database schema initialized');
    } catch (error) {
      console.error('Error initializing database schema:', error);
      throw error;
    }
  }

  async saveEvent(event: TelephonyEvent): Promise<string> {
    if (!this.client) throw new Error('Database client not initialized');

    const query = `
      INSERT INTO telephony_events (
        event_type,
        event_data,
        channel_id,
        caller_id,
        called_number,
        duration,
        queue_name,
        agent_name
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;

    const values = [
      event.eventType,
      event.eventData,
      event.channelId,
      event.callerId,
      event.calledNumber,
      event.duration,
      event.queueName,
      event.agentName
    ];

    const result = await this.client.query(query, values);
    return result.rows[0].id;
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.release();
      this.client = null;
    }
    await this.pool.end();
  }
} 