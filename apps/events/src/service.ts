import config from '@telecom/config';
import logger from '@telecom/logger';
import amqplib from 'amqplib';
import ami from 'asterisk-manager';

export class AsteriskEventsService {
  private ami: ReturnType<typeof ami>;
  private channel: AmqpChannel;
  private connection: AmqpConnection;

  public constructor() {
    this.ami = ami(
      config.asterisk.port,
      config.asterisk.host,
      config.asterisk.username,
      config.asterisk.password,
      true,
    );
  }

  public async start(): Promise<void> {
    try {
      this.connection = await amqplib.connect(config.rabbit.url);
      this.channel = await this.connection.createChannel();

      await this.channel.assertQueue(config.rabbit.queue, {
        durable: true,
      });

      this.ami.keepConnected();

      this.ami.on('connect', () => {
        logger.info('Connected to Asterisk AMI');
        this.ami.on('rawevent', this.handleAsteriskEvent.bind(this));
      });

      this.ami.on('error', (err: Error) => {
        logger.error('AMI Error:', { error: err });
      });

      this.connection.on('close', () => {
        logger.info('RabbitMQ connection closed');
        this.reconnect();
      });
    } catch (error) {
      logger.error('Error starting service:', { error });
      this.reconnect();
    }
  }

  private async handleAsteriskEvent(event: any): Promise<void> {
    if (!this.channel) return;

    try {
      const message = JSON.stringify({
        event: event.event,
        data: event,
      });

      this.channel.sendToQueue(config.rabbit.queue, Buffer.from(message), {
        persistent: true,
      });
    } catch (error) {
      logger.error('Error handling Asterisk event:', { error, event });
    }
  }

  private async reconnect(): Promise<void> {
    logger.info('Attempting to reconnect...');
    setTimeout(() => this.start(), 5000);
  }

  public async stop(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        this.channel = null;
      }
      if (this.connection) {
        await this.connection.close();
        this.connection = null;
      }
      this.ami.disconnect();
    } catch (error) {
      logger.error('Error stopping service:', { error });
    }
  }
}
