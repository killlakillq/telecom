import { Payload } from '@/common/types/payload.interface';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return reply.code(401).send({
      error: 'Unauthorized',
      statusCode: 401,
      message: 'No token provided',
    });
  }

  try {
    const decoded = await request.jwtVerify<Payload>();

    request.user = decoded;
  } catch (error: unknown) {
    if (error instanceof jwt.JsonWebTokenError) {
      return reply.code(401).send({
        error: 'Unauthorized',
        statusCode: 401,
        message: error.message,
      });
    }

    throw error;
  }
};
