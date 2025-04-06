import { z } from 'zod';

export const GetEventsRequest = z.object({
  caller_id: z.string(),
  event_type: z.string().optional(),
  start_timestamp: z.number().optional(),
  end_timestamp: z.number().optional(),
  limit: z.number().optional().default(10),
  offset: z.number().optional().default(0),
});

export type GetEventsRequest = z.infer<typeof GetEventsRequest>;
