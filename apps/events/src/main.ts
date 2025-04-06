import { RabbitProducer } from '@/producer';
import { AsteriskEventsService } from '@/service';
import { withErrorHandling } from '@/utils/error-handler';
import logger from '@telecom/logger';

const main = async () => {
  const service = new AsteriskEventsService(new RabbitProducer());

  await withErrorHandling(async () => {
    await service.start();
    logger.info('Asterisk events service started');
  }, 'start');

  process.on('SIGINT', () => {
    logger.info('shutting down');
    process.exit(0);
  });
};

void main();
