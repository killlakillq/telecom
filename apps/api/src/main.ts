import { routes } from '@/common/routes';
import config from '@telecom/config';
import fastify from 'fastify';

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

// server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
//   try {
//     await authenticateToken(request, reply);
//   } catch (error) {
//     reply.code(401).send({ error: 'Unauthorized' });
//   }
// });

server.register(routes, { prefix: '/api' });

const start = async () => {
  try {
    await server.listen({ port: config.api.port, host: config.api.host });
  } catch (err) {
    process.exit(1);
  }
};

start();
