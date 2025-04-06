import { EventsStorageService } from '@/events-storage/events-storage.service';
import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { EventsStorageServerProto } from '@telecom/grpc';
import logger from '@telecom/logger';
import { join } from 'path';

const PROTO_PATH = join(process.cwd(), '../../libs/grpc/src/protos/events-storage.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = loadPackageDefinition(packageDefinition);
const eventsStorageProto = protoDescriptor.eventsStorage as EventsStorageServerProto;

export class GrpcServer {
  private server: Server;

  public constructor(private readonly eventStorageService: EventsStorageService) {
    this.server = new Server();
    this.setupServer();
  }

  private setupServer() {
    this.server.addService(eventsStorageProto.EventsStorage.service, {
      getEvents: this.eventStorageService.find.bind(this.eventStorageService),
    });
  }

  public start(host: string, port: number) {
    this.server.bindAsync(`${host}:${port}`, ServerCredentials.createInsecure(), (error, port) => {
      if (error) {
        logger.error('Failed to start gRPC server:', error);
        return;
      }
      logger.info(`gRPC server running on ${host}:${port}`);
    });
  }

  public stop() {
    this.server.forceShutdown();
  }
}
