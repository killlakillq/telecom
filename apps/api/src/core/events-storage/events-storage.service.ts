import { EventsStorageClient } from '@/core/events-storage/events-storage.client';
import { UserService } from '@/core/user/user.service';
import { GetEventsRequest, GrpcTimestamp, parseGrpcTimestamp } from '@telecom/grpc';

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
      timestamp: parseGrpcTimestamp(event.timestamp as unknown as GrpcTimestamp),
    }));
  }
}
