import { AsteriskEventsService } from '@/asterisk-events.service';
import { asteriskConfig, rabbitConfig } from '@/config';
import logger from '@telecom/logger';

const main = async () => {
  const service = new AsteriskEventsService(asteriskConfig, rabbitConfig);

  await service.start();

  process.on('SIGINT', async () => {
    logger.info('Received SIGINT signal, stopping service...');
    await service.stop();
    process.exit(0);
  });
};

main().catch((error) => {
  logger.error('Failed to start service:', { error });
  process.exit(1);
});
