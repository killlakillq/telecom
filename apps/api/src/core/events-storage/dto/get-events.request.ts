import { z } from 'zod';

export const GetEventsRequest = z.object({
  event_type: z.string().optional(),
  start_timestamp: z.coerce.date().optional(),
  end_timestamp: z.coerce.date().optional(),
  limit: z.coerce.number().optional().default(10),
  offset: z.coerce.number().optional().default(0),
});

export type GetEventsRequest = z.infer<typeof GetEventsRequest>;
