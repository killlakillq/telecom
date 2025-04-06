import { LoginUserRequest } from '@/auth/dto/login-user.request';
import { z } from 'zod';

export const LoginUserResponse = LoginUserRequest.extend({
  token: z.string(),
});

export type LoginUserResponse = z.infer<typeof LoginUserResponse>;
