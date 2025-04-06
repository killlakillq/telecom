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
    secret: string;
    expiresIn: number;
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
    apiDatabase: string;
    eventsDatabase: string;
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
  logLevel: process.env['LOG_LEVEL'] as Level,
  env: process.env['ENV_NAME'],
  applicationName: 'telecom',
  version: process.env['VERSION'] || 'latest',
  http: {
    port: parseInt(process.env['PORT']),
  },
  nodeEnv: process.env['NODE_ENV'],
  jwt: {
    secret: process.env['JWT_SECRET'],
    expiresIn: parseInt(process.env['JWT_EXPIRES_IN']),
  },
  prettyLogging: process.env['PRETTY_LOGGING'],
  asterisk: {
    host: process.env['ASTERISK_AMI_HOST'],
    port: parseInt(process.env['ASTERISK_AMI_PORT']),
    username: process.env['ASTERISK_AMI_USERNAME'],
    password: process.env['ASTERISK_AMI_PASSWORD'],
  },
  rabbit: {
    url: process.env['RABBIT_URL'],
    queue: process.env['RABBIT_QUEUE'],
  },
  postgres: {
    host: process.env['POSTGRES_HOST'],
    port: parseInt(process.env['POSTGRES_PORT']),
    username: process.env['POSTGRES_USERNAME'],
    password: process.env['POSTGRES_PASSWORD'],
    apiDatabase: process.env['POSTGRES_API_DATABASE'],
    eventsDatabase: process.env['POSTGRES_EVENTS_DATABASE'],
  },
  api: {
    address: process.env['API_ADDRESS'],
    host: process.env['API_HOST'],
    port: parseInt(process.env['API_PORT']),
  },
  eventsStorage: {
    address: process.env['EVENTS_STORAGE_ADDRESS'],
    host: process.env['EVENTS_STORAGE_HOST'],
    port: parseInt(process.env['EVENTS_STORAGE_PORT']),
  },
  events: {
    address: process.env['EVENTS_ADDRESS'],
    host: process.env['EVENTS_HOST'],
    port: parseInt(process.env['EVENTS_PORT']),
  },
} satisfies Config;
