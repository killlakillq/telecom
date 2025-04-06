import { EventsStorageService } from '@/events-storage/events-storage.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GetEventsRequest } from './dto/get-events.request';

export class EventsStorageController {
  public constructor(private readonly eventsStorageService: EventsStorageService) {}

  public async getEvents(request: FastifyRequest, reply: FastifyReply) {
    const { event_type, start_timestamp, end_timestamp, limit, offset } = GetEventsRequest.parse(
      request.query,
    );

    const { userId } = request.user;

    const events = await this.eventsStorageService.getEvents(userId, {
      eventType: event_type,
      startTimestamp: start_timestamp,
      endTimestamp: end_timestamp,
      limit,
      offset,
    });

    reply.code(200).send({
      events,
    });
  }
}
