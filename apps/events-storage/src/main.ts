import { Database } from '@/database/client';
import { EventRepository } from '@/events-storage/events-storage.repository';
import { EventsStorageService } from '@/events-storage/events-storage.service';
import { GrpcServer } from '@/grpc';
import config from '@telecom/config';
import logger from '@telecom/logger';

const main = async () => {
  const db = Database.getInstance();
  const client = await db.getClient();

  const eventRepository = new EventRepository(client);
  const service = new EventsStorageService(eventRepository);
  const grpcServer = new GrpcServer(service);

  await service.start();
  grpcServer.start(config.eventsStorage.host, config.eventsStorage.port);

  logger.info('Events storage service started');

  process.on('SIGINT', async () => {
    logger.info('Received SIGINT signal, stopping service...');
    await service.stop();
    grpcServer.stop();
    process.exit(0);
  });
};

void main();
