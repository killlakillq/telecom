import { AuthService } from '@/auth/auth.service';
import { LoginUserRequest } from '@/auth/dto/login-user.request';
import { RegisterUserRequest } from '@/auth/dto/register-user.request';
import { FastifyReply, FastifyRequest } from 'fastify';

export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  public async login(request: FastifyRequest, reply: FastifyReply) {
    const params = request.body as LoginUserRequest;

    const user = await this.authService.login(params);

    reply.status(200).send(user);
  }

  public async register(request: FastifyRequest, reply: FastifyReply) {
    const params = request.body as RegisterUserRequest;

    const user = await this.authService.register(params);

    reply.status(200).send(user);
  }
}
