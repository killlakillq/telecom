import { UserService } from '@/core/user/user.service';
import { FastifyReply, FastifyRequest } from 'fastify';

export class UserController {
  public constructor(private readonly userService: UserService) {}

  public async findById(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.user;

    const user = await this.userService.findById(userId);

    reply.status(200).send(user);
  }
}
