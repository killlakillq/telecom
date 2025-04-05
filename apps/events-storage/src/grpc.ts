import { EventsStorageService } from '@/services/service';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { EventsStorageServerProto } from '@telecom/grpc';
import logger from '@telecom/logger';
import { join } from 'path';

const PROTO_PATH = join(__dirname, '../../../libs/grpc/src/protos/events-storage.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const eventsStorageProto = protoDescriptor.eventsStorage as EventsStorageServerProto;

export class GrpcServer {
  private server: grpc.Server;

  public constructor(private readonly eventStorageService: EventsStorageService) {
    this.server = new grpc.Server();
    this.setupServer();
  }

  private setupServer() {
    this.server.addService(eventsStorageProto.EventsStorage.service, {
      getEvents: this.eventStorageService.getEvents.bind(this),
      getEvent: this.eventStorageService.getEvent.bind(this),
    });
  }

  public start(host: string, port: number) {
    this.server.bindAsync(
      `${host}:${port}`,
      grpc.ServerCredentials.createInsecure(),
      (error, port) => {
        if (error) {
          logger.error('Failed to start gRPC server:', error);
          return;
        }
        logger.info(`gRPC server running on ${host}:${port}`);
      },
    );
  }

  public stop() {
    this.server.forceShutdown();
  }
}
