import { EventRepository } from '@/events-storage/events-storage.repository';
import { InitService } from '@/events-storage/init.service';
import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import config from '@telecom/config';
import {
  CreateEventRequest,
  CreateEventResponse,
  GetEventsRequest,
  GetEventsResponse,
} from '@telecom/grpc';
import { ConsumeMessage } from 'amqplib';

export class EventsStorageService extends InitService {
  public constructor(private readonly eventRepository: EventRepository) {
    super();
  }

  public async start(): Promise<void> {
    await super.start();
    const channel = this.getChannel;
    await channel.consume(config.rabbit.queue, this.handleMessage.bind(this), {
      noAck: false,
    });
  }

  private async handleMessage(msg: ConsumeMessage): Promise<void> {
    if (!msg || !this.getChannel) return;

    const content = JSON.parse(msg.content.toString()) as Event;

    const event = {
      eventType: content.eventType,
      eventData: content.eventData,
      source: content.source,
      timestamp: content.timestamp,
    };

    await this.eventRepository.create(event);

    this.getChannel.ack(msg);
  }

  public async create(
    call: ServerUnaryCall<CreateEventRequest, CreateEventResponse>,
    callback: sendUnaryData<CreateEventResponse>,
  ): Promise<void> {
    const { eventType, eventData, source, timestamp } = call.request;
    const event = await this.eventRepository.create({ eventType, eventData, source, timestamp });

    callback(null, {
      event,
    });
  }

  public async find(
    call: ServerUnaryCall<GetEventsRequest, GetEventsResponse>,
    callback: sendUnaryData<GetEventsResponse>,
  ): Promise<void> {
    const { eventType, eventData, source, startTimestamp, endTimestamp, limit, offset, callerId } =
      call.request;

    const events = await this.eventRepository.find({
      eventType,
      eventData,
      source,
      startTimestamp,
      endTimestamp,
      limit,
      offset,
      callerId,
    });

    const eventsWithData = events.map((event) => ({
      ...event,
      eventType: event.event_type,
      eventData: event.event_data ? JSON.stringify(event.event_data) : null,
    }));

    callback(null, {
      events: eventsWithData,
      totalCount: 0,
    });
  }
}
