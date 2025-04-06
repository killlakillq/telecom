import { Database } from '@/database/client';
import config from '@telecom/config';
import logger from '@telecom/logger';
import amqplib from 'amqplib';

export class InitService {
  private connection: AmqpConnection;
  private channel: AmqpChannel;
  private db: Database = new Database();

  public async start(): Promise<void> {
    await this.db.connect();

    this.connection = await amqplib.connect(config.rabbit.url);
    this.channel = await this.connection.createChannel();

    await this.channel.assertQueue(config.rabbit.queue, {
      durable: true,
    });

    logger.info('Started consuming messages from RabbitMQ');

    if (this.connection) {
      this.connection.on('close', () => {
        logger.warn('RabbitMQ connection closed, attempting to reconnect...');
        void this.reconnect();
      });
    }
  }

  protected async reconnect(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
    await this.start();
  }

  public async stop(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
    await this.db.disconnect();
  }

  protected get getChannel(): AmqpChannel {
    return this.channel;
  }

  protected get getDb(): Database {
    return this.db;
  }
}
