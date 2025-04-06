import { authRouter } from '@/common/routes/auth.route';
import { eventsStorageRouter } from '@/common/routes/events-storage.route';
import { userRouter } from '@/common/routes/user.route';
import { FastifyInstance } from 'fastify';

export async function routes(fastify: FastifyInstance) {
  fastify.register(eventsStorageRouter, { prefix: '/events' });
  fastify.register(userRouter, { prefix: '/users' });
  fastify.register(authRouter, { prefix: '/auth' });
}
