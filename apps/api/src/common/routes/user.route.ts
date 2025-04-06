import { Database } from '@/database/client';
import { UserController } from '@/user/user.controller';
import { UserRepository } from '@/user/user.repository';
import { UserService } from '@/user/user.service';
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
