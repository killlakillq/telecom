import { Payload } from '@/common/types/payload.interface';
import config from '@telecom/config';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export const authenticateToken = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret) as Payload;
    request.user = { id: decoded.id, phoneNumber: decoded.phoneNumber };
  } catch (error) {
    throw new Error('Invalid token');
  }
};
