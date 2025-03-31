import { join } from 'node:path';

import { config } from 'dotenv-safe';
import { Level } from 'pino';

config({
  allowEmptyValues: true,
  path: join(__dirname, '..', '.env'),
  sample: join(__dirname, '..', '.env.example'),
});

export default {
  logLevel: process.env['LOG_LEVEL']! as Level,
  env: process.env['ENV_NAME'],
  applicationName: 'telecom',
  version: process.env['VERSION'] || 'latest',
  http: {
    port: process.env['PORT'] as string,
  },
  nodeEnv: process.env['NODE_ENV'],
  jwtAccessSecret: process.env['JWT_ACCESS_SECRET'],
  jwtRefreshSecret: process.env['JWT_REFRESH_SECRET'],
  prettyLogging: process.env['PRETTY_LOGGING'],
  asterisk: {
    host: process.env['ASTERISK_HOST'],
    port: process.env['ASTERISK_PORT'],
    username: process.env['ASTERISK_USERNAME'],
    password: process.env['ASTERISK_PASSWORD'],
  },
  rabbit: {
    url: process.env['RABBIT_URL'],
    queue: process.env['RABBIT_QUEUE'],
  },
  postgres: {
    host: process.env['POSTGRES_HOST'],
    port: process.env['POSTGRES_PORT'],
    username: process.env['POSTGRES_USERNAME'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DATABASE'],
  },
};
