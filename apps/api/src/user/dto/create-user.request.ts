import { z } from 'zod';

export const CreateUserRequest = z.object({
  username: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequest>;
