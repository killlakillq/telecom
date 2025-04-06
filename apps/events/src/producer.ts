import config from '@telecom/config';
import logger from '@telecom/logger';
import { connect } from 'amqplib';

export class RabbitProducer {
  private channel: AmqpChannel;
  private connection: AmqpConnection;

  public async setup() {
    const connection = await connect(config.rabbit.url);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(config.rabbit.queue, { durable: true });
    logger.info('Connected to RabbitMQ');
  }

  public sendToQueue(msg: object) {
    if (!this.channel) return;
    const buffer = Buffer.from(JSON.stringify(msg));
    this.channel.sendToQueue(config.rabbit.queue, buffer, { persistent: true });
  }

  public async close(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
  }
}
