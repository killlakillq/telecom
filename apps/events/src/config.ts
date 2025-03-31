import config from '@telecom/config';

import { AsteriskConfig, RabbitMQConfig } from './types';

export const asteriskConfig: AsteriskConfig = {
  host: config.asterisk.host,
  port: parseInt(config.asterisk.port),
  username: config.asterisk.username,
  password: config.asterisk.password,
};

export const rabbitConfig: RabbitMQConfig = {
  url: config.rabbit.url,
  queue: config.rabbit.queue,
};
