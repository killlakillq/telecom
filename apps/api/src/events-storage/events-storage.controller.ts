import { EventsStorageService } from '@/events-storage/events-storage.service';
import { FastifyReply, FastifyRequest } from 'fastify';

export class EventsStorageController {
  public constructor(private readonly eventsStorageService: EventsStorageService) {}

  public async getEvents(request: FastifyRequest, reply: FastifyReply) {
    const events = await this.eventsStorageService.getEvents({
      eventType: 'asd',
    });

    reply.send(events);
  }

  public async getEventById(request: FastifyRequest, reply: FastifyReply) {
    const { eventId } = request.params as { eventId: string };
    const event = await this.eventsStorageService.getEvent({ eventId });
    reply.send(event);
  }
}
