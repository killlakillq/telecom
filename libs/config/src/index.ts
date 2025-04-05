import { join } from 'node:path';

import { config } from 'dotenv-safe';
import { Level } from 'pino';

config({
  allowEmptyValues: true,
  path: join(__dirname, '..', '..', '..', '.env'),
  sample: join(__dirname, '..', '..', '..', '.env.example'),
});

interface Config {
  logLevel: Level;
  env: string;
  applicationName: string;
  version: string;
  http: {
    port: number;
  };
  nodeEnv: string;
  jwt: {
    accessSecret: string;
    refreshSecret: string;
  };
  prettyLogging: string;
  asterisk: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
  rabbit: {
    url: string;
    queue: string;
  };
  postgres: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  api: {
    address: string;
    host: string;
    port: number;
  };
  eventsStorage: {
    address: string;
    host: string;
    port: number;
  };
  events: {
    address: string;
    host: string;
    port: number;
  };
}
export default {
  logLevel: process.env['LOG_LEVEL']! as Level,
  env: process.env['ENV_NAME'],
  applicationName: 'telecom',
  version: process.env['VERSION'] || 'latest',
  http: {
    port: parseInt(process.env['PORT'] as string),
  },
  nodeEnv: process.env['NODE_ENV'],
  jwt: {
    accessSecret: process.env['JWT_ACCESS_SECRET'],
    refreshSecret: process.env['JWT_REFRESH_SECRET'],
  },
  prettyLogging: process.env['PRETTY_LOGGING'],
  asterisk: {
    host: process.env['ASTERISK_HOST'] as string,
    port: parseInt(process.env['ASTERISK_PORT'] as string),
    username: process.env['ASTERISK_USERNAME'] as string,
    password: process.env['ASTERISK_PASSWORD'] as string,
  },
  rabbit: {
    url: process.env['RABBIT_URL'] as string,
    queue: process.env['RABBIT_QUEUE'] as string,
  },
  postgres: {
    host: process.env['POSTGRES_HOST'] as string,
    port: parseInt(process.env['POSTGRES_PORT'] as string),
    username: process.env['POSTGRES_USERNAME'] as string,
    password: process.env['POSTGRES_PASSWORD'] as string,
    database: process.env['POSTGRES_DATABASE'] as string,
  },
  api: {
    address: process.env['API_ADDRESS'] as string,
    host: process.env['API_HOST'] as string,
    port: parseInt(process.env['API_PORT'] as string),
  },
  eventsStorage: {
    address: process.env['EVENTS_STORAGE_ADDRESS'] as string,
    host: process.env['EVENTS_STORAGE_HOST'] as string,
    port: parseInt(process.env['EVENTS_STORAGE_PORT'] as string),
  },
  events: {
    address: process.env['EVENTS_ADDRESS'] as string,
    host: process.env['EVENTS_HOST'] as string,
    port: parseInt(process.env['EVENTS_PORT'] as string),
  },
} satisfies Config;
