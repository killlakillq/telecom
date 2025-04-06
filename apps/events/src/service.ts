import { RabbitProducer } from '@/producer';
import config from '@telecom/config';
import AsteriskAmi, { AmiEvent } from 'asterisk-ami-client';
import os from 'node:os';

export class AsteriskEventsService {
  private ami: AsteriskAmi;

  public constructor(private producer: RabbitProducer) {
    this.ami = new AsteriskAmi({
      reconnect: true,
      keepAlive: true,
    });
  }

  public async start(): Promise<void> {
    await this.ami.connect(config.asterisk.username, config.asterisk.password, {
      host: config.asterisk.host,
      port: config.asterisk.port,
    });

    await this.producer.setup();

    this.ami.on('event', (event: AmiEvent) => {
      const payload = {
        eventType: event.Event,
        eventData: event,
        source: 'asterisk@' + os.hostname(),
        timestamp: new Date().toISOString(),
      };

      this.producer.sendToQueue(payload);
    });
  }

  public stop(): void {
    this.ami.disconnect();
  }
}
