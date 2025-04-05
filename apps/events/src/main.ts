import { AsteriskEventsService } from '@/service';
import logger from '@telecom/logger';

const main = async () => {
  const service = new AsteriskEventsService();

  await service.start();
  logger.info('Asterisk events service started');

  process.on('SIGINT', async () => {
    logger.info('Received SIGINT signal, stopping service...');
    await service.stop();
    process.exit(0);
  });
};

main();
