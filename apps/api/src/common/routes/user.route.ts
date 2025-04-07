import { UserController } from '@/core/user/user.controller';
import { UserRepository } from '@/core/user/user.repository';
import { UserService } from '@/core/user/user.service';
import { Database } from '@/database/client';
import { FastifyInstance } from 'fastify';

export async function userRouter(fastify: FastifyInstance) {
  const db = Database.getInstance();
  const client = await db.getClient();
  const userController = new UserController(new UserService(new UserRepository(client)));

  fastify.get('/me', {
    preHandler: fastify.authenticate,
    handler: userController.findById.bind(userController),
  });
}
