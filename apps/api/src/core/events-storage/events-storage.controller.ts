import { GetEventsRequest } from '@/core/events-storage/dto/get-events.request';
import { EventsStorageService } from '@/core/events-storage/events-storage.service';
import { FastifyReply, FastifyRequest } from 'fastify';

export class EventsStorageController {
  public constructor(private readonly eventsStorageService: EventsStorageService) {}

  public async getEvents(request: FastifyRequest, reply: FastifyReply) {
    const { event_type, start_timestamp, end_timestamp, limit, offset } = GetEventsRequest.parse(
      request.query,
    );

    const { userId } = request.user;

    const startDate = new Date(start_timestamp);
    const startTimestampProto = {
      seconds: Math.floor(startDate.getTime() / 1000),
      nanos: (startDate.getMilliseconds() % 1000) * 1e6,
    };

    const endDate = new Date(end_timestamp);
    const endTimestampProto = {
      seconds: Math.floor(endDate.getTime() / 1000),
      nanos: (endDate.getMilliseconds() % 1000) * 1e6,
    };

    const events = await this.eventsStorageService.getEvents(userId, {
      eventType: event_type,
      startTimestamp: startTimestampProto as unknown as Date,
      endTimestamp: endTimestampProto as unknown as Date,
      limit,
      offset,
    });

    reply.code(200).send({
      events,
      total_count: events.length,
    });
  }
}
