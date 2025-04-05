import { AsyncLocalStorage } from 'node:async_hooks';
import { randomBytes } from 'node:crypto';

import Pino, { destination, Level, Logger, LoggerOptions } from 'pino';
import { PrettyOptions } from 'pino-pretty';

import config from '@telecom/config';

const asyncLocalStorage = new AsyncLocalStorage<string>();

export function setTraceId(requestId?: string) {
  const traceId = requestId || randomBytes(16).toString('hex');
  asyncLocalStorage.enterWith(traceId);
  return traceId;
}

const prettyConfig: PrettyOptions = {
  colorize: true,
  levelFirst: true,
  ignore: 'serviceContext',
  translateTime: 'SYS:HH:MM:ss.l',
};

const options: LoggerOptions = {
  level: config.logLevel,
  base: {
    serviceContext: {
      service: config.applicationName,
      version: config.version,
    },
  },
  redact: {
    paths: ['pid', 'hostname', 'body.password', 'body.refreshToken'],
    remove: true,
  },
  transport:
    Number(config.prettyLogging) > 0
      ? {
          target: 'pino-pretty',
          options: prettyConfig,
        }
      : undefined,
};

const stdout = Pino(options);
const stderr = Pino(options, destination(2));

const logger: Pick<Logger, Level> = {
  trace: stdout.trace.bind(stdout),
  debug: stdout.debug.bind(stdout),
  info: stdout.info.bind(stdout),
  warn: stdout.warn.bind(stdout),
  error: stderr.error.bind(stderr),
  fatal: stderr.fatal.bind(stderr),
};

export default logger;
