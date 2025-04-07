import { Event } from '@telecom/grpc';

export type EventParams = Omit<Event, 'id'>;
