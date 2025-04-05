import { EventRepository } from '@/repository';
import { InitService } from '@/services/init.service';
import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import config from '@telecom/config';
import {
  GetEventRequest,
  GetEventResponse,
  GetEventsRequest,
  GetEventsResponse,
} from '@telecom/grpc';

export class EventsStorageService extends InitService {
  constructor(private readonly eventRepository: EventRepository) {
    super();
  }

  public async start(): Promise<void> {
    await super.start();
    const channel = this.getChannel;
    await channel.consume(config.rabbit.queue, this.handleMessage.bind(this), {
      noAck: false,
    });
  }

  private async handleMessage(msg: any): Promise<void> {
    if (!msg || !this.getChannel) return;

    const content = JSON.parse(msg.content.toString());
    const event = {
      eventType: content.event,
      eventData: content.data,
      // channelId: content.data.channel || content.data.channelid,
      // callerId: content.data.callerid,
      // calledNumber: content.data.exten || content.data.destination,
      // duration: parseInt(content.data.duration) || undefined,
      // queueName: content.data.queue,
      // agentName: content.data.agent,
      source: content.source,
      timestamp: content.timestamp,
    };

    // await this.eventRepository.saveEvent(event);

    this.getChannel.ack(msg);
  }

  public async getEvents(
    call: ServerUnaryCall<GetEventsRequest, GetEventsResponse>,
    callback: sendUnaryData<GetEventsResponse>,
  ): Promise<void> {
    callback(null, {
      eventType: call.request.eventType,
    });
  }

  public async getEvent(
    call: ServerUnaryCall<GetEventRequest, GetEventResponse>,
    callback: (err: any, response: any) => void,
  ) {
    console.log(call);
    return callback(null, {
      eventId: 1,
      eventType: '123',
      eventData: '123',
      source: '123',
      timestamp: '123',
      success: true,
      error: null,
    });
  }
}
