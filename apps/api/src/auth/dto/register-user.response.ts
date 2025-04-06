import { z } from 'zod';

export const RegisterUserResponse = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type RegisterUserResponse = z.infer<typeof RegisterUserResponse>;
