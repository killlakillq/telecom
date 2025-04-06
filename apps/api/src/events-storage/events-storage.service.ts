import { EventsStorageClient } from '@/events-storage/events-storage.client';
import { UserService } from '@/user/user.service';
import { GetEventsRequest } from '@telecom/grpc';

export class EventsStorageService {
  public constructor(
    private readonly client: EventsStorageClient,
    private readonly userService: UserService,
  ) {}

  public async getEvents(userId: string, params: Partial<GetEventsRequest>) {
    const user = await this.userService.findById(userId);

    const events = await this.client.getEvents({
      ...params,
      callerId: user.phoneNumber,
    });

    return events.events.map((event) => ({
      ...event,
      eventData: event.eventData ? JSON.parse(event.eventData) : null,
    }));
  }
}
