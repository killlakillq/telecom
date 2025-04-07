import { z } from 'zod';

export const CreateUserResponse = z.object({
  id: z.string(),
  phoneNumber: z.string(),
  username: z.string(),
  password: z.string(),
});

export type CreateUserResponse = z.infer<typeof CreateUserResponse>;
