import { authenticate } from '@/common/middleware/auth.middleware';
import { routes } from '@/common/routes';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifyRateLimit from '@fastify/rate-limit';
import config from '@telecom/config';
import logger from '@telecom/logger';
import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

const server = fastify({
  logger: {
    level: config.logLevel,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  },
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(routes, { prefix: '/api' });
server.register(fastifyJwt, { secret: config.jwt.secret });
server.register(fastifyCors, { origin: '*' });
server.register(fastifyRateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

server.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    await authenticate(request, reply);
  } catch (err) {
    reply.send(err);
  }
});

const start = async () => {
  try {
    await server.listen({ port: config.api.port, host: config.api.host });
  } catch (err) {
    logger.error({ err }, 'Error starting server');
    process.exit(1);
  }
};

void start();
