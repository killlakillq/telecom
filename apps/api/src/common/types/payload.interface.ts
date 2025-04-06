import z from 'zod';

export const Payload = z
  .object({
    userId: z.string(),
    phoneNumber: z.string(),
  })
  .required();

export type Payload = z.infer<typeof Payload>;

export interface AuthToken {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
}
