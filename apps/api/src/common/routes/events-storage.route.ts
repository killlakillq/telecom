import { GetEventsRequest } from '@/core/events-storage/dto/get-events.request';
import { EventsStorageClient } from '@/core/events-storage/events-storage.client';
import { EventsStorageController } from '@/core/events-storage/events-storage.controller';
import { EventsStorageService } from '@/core/events-storage/events-storage.service';
import { UserRepository } from '@/core/user/user.repository';
import { UserService } from '@/core/user/user.service';
import { Database } from '@/database/client';
import config from '@telecom/config';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export async function eventsStorageRouter(fastify: FastifyInstance) {
  const database = Database.getInstance();
  const client = await database.getClient();
  const userService = new UserService(new UserRepository(client));

  const eventsController = new EventsStorageController(
    new EventsStorageService(new EventsStorageClient(config.eventsStorage.address), userService),
  );

  fastify.withTypeProvider<ZodTypeProvider>().get('/', {
    schema: {
      querystring: GetEventsRequest,
    },
    preHandler: fastify.authenticate,
    handler: eventsController.getEvents.bind(eventsController),
  });
}
