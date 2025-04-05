import logger from '@telecom/logger';
import { FastifyReply, FastifyRequest } from 'fastify';

type AsyncFunction<T> = (request: FastifyRequest, reply: FastifyReply) => Promise<T>;

export function withErrorHandling<T>(handler: AsyncFunction<T>, context: string): AsyncFunction<T> {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      return handler(request, reply);
    } catch (error) {
      logger.error({ error }, `Error in ${context}`);
      reply.status(500).send({ error: `Failed to ${context}` });
    }
  };
}
