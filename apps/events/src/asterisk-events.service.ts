import { AsteriskConfig, RabbitMQConfig } from '@/types';
import logger from '@telecom/logger';
import amqp, { Channel, ChannelModel } from 'amqplib';
import ami from 'asterisk-manager';

export class AsteriskEventsService {
  private ami: ReturnType<typeof ami>;
  private channel: Channel;
  private connection: ChannelModel;

  public constructor(
    private readonly asteriskConfig: AsteriskConfig,
    private readonly rabbitConfig: RabbitMQConfig,
  ) {
    this.ami = ami(
      asteriskConfig.port,
      asteriskConfig.host,
      asteriskConfig.username,
      asteriskConfig.password,
      true,
    );
  }

  public async start(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.rabbitConfig.url);
      this.channel = await this.connection.createChannel();

      await this.channel.assertQueue(this.rabbitConfig.queue, {
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
    try {
      if (!this.channel) {
        throw new Error('RabbitMQ channel not available');
      }

      if (
        event.event === 'Newchannel' ||
        event.event === 'Hangup' ||
        event.event === 'Bridge' ||
        event.event === 'QueueMember'
      ) {
        const message = JSON.stringify({
          timestamp: new Date().toISOString(),
          event: event.event,
          data: event,
        });

        this.channel.sendToQueue(this.rabbitConfig.queue, Buffer.from(message));
        logger.debug(`Forwarded ${event.event} event to RabbitMQ`);
      }
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
      }
      if (this.connection) {
        await this.connection.close();
      }
      this.ami.disconnect();
      logger.info('Service stopped successfully');
    } catch (error) {
      logger.error('Error stopping service:', { error });
    }
  }
}
