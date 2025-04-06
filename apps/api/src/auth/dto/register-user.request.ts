import { z } from 'zod';

export const RegisterUserRequest = z
  .object({
    phoneNumber: z.string(),
    username: z.string(),
    password: z.string(),
  })
  .required();

export type RegisterUserRequest = z.infer<typeof RegisterUserRequest>;
