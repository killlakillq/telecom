import { eventsStorageRouter } from '@/events-storage/events-storage.route';
import { FastifyInstance } from 'fastify';

export async function routes(fastify: FastifyInstance) {
  fastify.register(eventsStorageRouter);
}
