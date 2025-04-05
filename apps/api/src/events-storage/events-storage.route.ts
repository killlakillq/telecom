import { withErrorHandling } from '@/common/utils/error-handler';
import { EventsStorageClient } from '@/events-storage/events-storage.client';
import { EventsStorageController } from '@/events-storage/events-storage.controller';
import { EventsStorageService } from '@/events-storage/events-storage.service';
import config from '@telecom/config';
import { FastifyInstance } from 'fastify';

export async function eventsStorageRouter(fastify: FastifyInstance) {
  const eventsController = new EventsStorageController(
    new EventsStorageService(new EventsStorageClient(config.eventsStorage.address)),
  );

  fastify.get('/events/storage', {
    preHandler: fastify.authenticate,
    handler: withErrorHandling(eventsController.getEvents.bind(eventsController), 'get events'),
  });

  fastify.get('/events/:eventId/storage', {
    preHandler: fastify.authenticate,
    schema: {
      params: {
        type: 'object',
        properties: {
          eventId: { type: 'string' },
        },
        required: ['eventId'],
      },
    },
    handler: withErrorHandling(
      eventsController.getEventById.bind(eventsController),
      'get event by id',
    ),
  });
}
