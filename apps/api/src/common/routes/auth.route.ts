import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { LoginUserRequest } from '@/auth/dto/login-user.request';
import { RegisterUserRequest } from '@/auth/dto/register-user.request';
import { UserRepository } from '@/core/user/user.repository';
import { UserService } from '@/core/user/user.service';
import { Database } from '@/database/client';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export async function authRouter(fastify: FastifyInstance) {
  const db = Database.getInstance();
  const client = await db.getClient();
  const authController = new AuthController(
    new AuthService(new UserService(new UserRepository(client))),
  );

  fastify.withTypeProvider<ZodTypeProvider>().post('/login', {
    schema: {
      body: LoginUserRequest,
    },
    handler: authController.login.bind(authController),
  });

  fastify.withTypeProvider<ZodTypeProvider>().post('/register', {
    schema: {
      body: RegisterUserRequest,
    },
    handler: authController.register.bind(authController),
  });
}
