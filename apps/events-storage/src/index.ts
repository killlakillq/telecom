import * as amqp from 'amqplib';
import * as dotenv from 'dotenv';
import { DatabaseClient, TelephonyEvent } from './db/client';

dotenv.config();

interface RabbitMQConfig {
  url: string;
  queue: string;
}

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

class EventsStorageService {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private dbClient: DatabaseClient | null = null;

  constructor(
    private rabbitConfig: RabbitMQConfig,
    private dbConfig: DatabaseConfig
  ) {}

  async start(): Promise<void> {
    try {
      // Initialize database connection
      this.dbClient = new DatabaseClient(this.dbConfig);
      await this.dbClient.connect();

      // Connect to RabbitMQ
      this.connection = await amqp.connect(this.rabbitConfig.url);
      this.channel = await this.connection.createChannel();
      
      // Assert queue exists
      await this.channel.assertQueue(this.rabbitConfig.queue, {
        durable: true
      });

      // Start consuming messages
      await this.channel.consume(this.rabbitConfig.queue, this.handleMessage.bind(this), {
        noAck: false // Enable manual acknowledgment
      });

      console.log('Started consuming messages from RabbitMQ');

      // Handle RabbitMQ connection close
      this.connection.on('close', () => {
        console.log('RabbitMQ connection closed');
        this.reconnect();
      });

    } catch (error) {
      console.error('Error starting service:', error);
      this.reconnect();
    }
  }

  private async handleMessage(msg: amqp.ConsumeMessage | null): Promise<void> {
    if (!msg || !this.channel || !this.dbClient) return;

    try {
      const content = JSON.parse(msg.content.toString());
      const event: TelephonyEvent = {
        eventType: content.event,
        eventData: content.data,
        channelId: content.data.channel || content.data.channelid,
        callerId: content.data.callerid,
        calledNumber: content.data.exten || content.data.destination,
        duration: parseInt(content.data.duration) || undefined,
        queueName: content.data.queue,
        agentName: content.data.agent
      };

      // Save event to database
      const id = await this.dbClient.saveEvent(event);
      console.log(`Stored event ${event.eventType} with ID ${id}`);

      // Acknowledge message
      this.channel.ack(msg);
    } catch (error) {
      console.error('Error processing message:', error);
      // Reject message and requeue it
      this.channel.nack(msg, false, true);
    }
  }

  private async reconnect(): Promise<void> {
    console.log('Attempting to reconnect...');
    setTimeout(() => this.start(), 5000);
  }

  async stop(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      if (this.dbClient) {
        await this.dbClient.disconnect();
      }
    } catch (error) {
      console.error('Error stopping service:', error);
    }
  }
}

// Initialize and start the service
const rabbitConfig: RabbitMQConfig = {
  url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
  queue: process.env.RABBITMQ_QUEUE || 'asterisk_events'
};

const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'telecom'
};

const service = new EventsStorageService(rabbitConfig, dbConfig);

// Handle process termination
process.on('SIGINT', async () => {
  console.log('Stopping service...');
  await service.stop();
  process.exit(0);
});

// Start the service
service.start().catch(error => {
  console.error('Failed to start service:', error);
  process.exit(1);
}); 