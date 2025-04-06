import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function errorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    console.error('Error occurred:', error);

    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    reply.status(statusCode).send({
      statusCode,
      message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  });
}
