import { EventRepository } from '@/core/events-storage.repository';
import { InitService } from '@/core/init.service';
import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import config from '@telecom/config';
import {
  CreateEventRequest,
  CreateEventResponse,
  Event,
  formatToGrpcTimestamp,
  GetEventsRequest,
  GetEventsResponse,
  GrpcTimestamp,
  parseGrpcTimestamp,
} from '@telecom/grpc';
import logger from '@telecom/logger';
import { ConsumeMessage } from 'amqplib';

export class EventsStorageService extends InitService {
  public constructor(private readonly eventRepository: EventRepository) {
    super();
  }

  public async start(): Promise<void> {
    await super.start();
    const channel = this.getChannel;
    logger.info('Starting event consumption...');
    await channel.consume(config.rabbit.queue, this.handleMessage.bind(this), {
      noAck: false,
    });
    logger.info(`Consuming messages from queue: ${config.rabbit.queue}`);
  }

  private async handleMessage(msg: ConsumeMessage): Promise<void> {
    if (!msg || !this.getChannel) {
      logger.warn('Received null message or missing channel');
      return;
    }

    logger.info(`Received message: ${msg.content.toString()}`);
    try {
      const content = JSON.parse(msg.content.toString()) as Event;

      const event = {
        eventType: content.eventType,
        eventData: content.eventData,
        source: content.source,
        timestamp: content.timestamp
          ? parseGrpcTimestamp(content.timestamp as unknown as GrpcTimestamp)
          : null,
      };

      await this.eventRepository.create(event);
      logger.info(`Event created: ${content.eventType}`);
      this.getChannel.ack(msg);
      logger.info('Message acknowledged');
    } catch (error) {
      logger.error('Error processing message:', error);
      this.getChannel.nack(msg, false, false);
    }
  }

  public async create(
    call: ServerUnaryCall<CreateEventRequest, CreateEventResponse>,
    callback: sendUnaryData<CreateEventResponse>,
  ): Promise<void> {
    const { eventType, eventData, source, timestamp } = call.request;
    logger.info(`Create event request received: ${eventType}`);
    try {
      const event = await this.eventRepository.create({ eventType, eventData, source, timestamp });
      logger.info(`Event stored: ${eventType}`);
      callback(null, { event });
    } catch (error) {
      logger.error('Error creating event:', error);
      callback(error, null);
    }
  }

  public async find(
    call: ServerUnaryCall<GetEventsRequest, GetEventsResponse>,
    callback: sendUnaryData<GetEventsResponse>,
  ): Promise<void> {
    const { eventType, eventData, source, startTimestamp, endTimestamp, limit, offset, callerId } =
      call.request;

    logger.info(`Find event request received with filters: ${JSON.stringify(call.request)}`);

    const startDate = parseGrpcTimestamp(startTimestamp as unknown as GrpcTimestamp);
    const endDate = parseGrpcTimestamp(endTimestamp as unknown as GrpcTimestamp);

    try {
      const events = await this.eventRepository.find({
        eventType,
        eventData,
        source,
        startTimestamp: startDate,
        endTimestamp: endDate,
        limit,
        offset,
        callerId,
      });

      const eventsWithData = events.map((event) => {
        const parsedDate = formatToGrpcTimestamp(event.timestamp);

        return {
          ...event,
          eventType: event.event_type,
          eventData: event.event_data ? JSON.stringify(event.event_data) : null,
          ...(parsedDate ? { timestamp: parsedDate } : {}),
        };
      });

      logger.info(`Found ${eventsWithData.length} events`);
      callback(null, {
        events: eventsWithData as unknown as Event[],
        totalCount: events.length,
      });
    } catch (error) {
      logger.error('Error finding events:', error);
      callback(error, null);
    }
  }
}
