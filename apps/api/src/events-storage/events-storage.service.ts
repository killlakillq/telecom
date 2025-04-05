import { EventsStorageClient } from '@/events-storage/events-storage.client';
import { GetEventRequest, GetEventsRequest } from '@telecom/grpc';

export class EventsStorageService {
  public constructor(private readonly client: EventsStorageClient) {}

  public async getEvent(params: GetEventRequest) {
    const result = await this.client.getEvent(params);

    return result;
  }

  public async getEvents(params: GetEventsRequest) {
    const result = await this.client.getEvents(params);

    return result;
  }
}
