import { Payload } from '@/common/types/payload.interface';
import { JWT } from '@fastify/jwt';
import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: Payload;
  }
}
