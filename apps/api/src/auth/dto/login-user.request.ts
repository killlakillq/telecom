import { z } from 'zod';

export const LoginUserRequest = z.object({
  phoneNumber: z.string(),
  password: z.string(),
});

export type LoginUserRequest = z.infer<typeof LoginUserRequest>;
