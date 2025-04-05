import { GrpcWrapper } from '@/common/utils/grpc-wrapper';
import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {
  EventsStorage,
  EventsStorageClientProto,
  GetEventRequest,
  GetEventResponse,
  GetEventsRequest,
  GetEventsResponse,
} from '@telecom/grpc';
import logger from '@telecom/logger';
import { join } from 'path';

const protoPath = join(process.cwd(), '../../libs/grpc/src/protos/events-storage.proto');

const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = loadPackageDefinition(packageDefinition);

const eventsStorageProto = protoDescriptor.eventsStorage as EventsStorageClientProto;

export class EventsStorageClient {
  private client: EventsStorage;

  public constructor(serverAddress: string) {
    this.client = new eventsStorageProto.EventsStorage(serverAddress, credentials.createInsecure());
    logger.info(`Initialized EventsStorageService with server address: ${serverAddress}`);
  }

  public async getEvent(params: GetEventRequest): Promise<any> {
    return GrpcWrapper<GetEventRequest, GetEventResponse>(
      this.client.getEvent.bind(this.client),
      params,
    );
  }

  public async getEvents(params: GetEventsRequest): Promise<GetEventsResponse> {
    return GrpcWrapper<GetEventsRequest, GetEventsResponse>(
      this.client.getEvents.bind(this.client),
      params,
    );
  }
}
