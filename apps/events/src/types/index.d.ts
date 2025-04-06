type AmqpConnection = {
  createChannel(): Promise<AmqpChannel>;
  close(): Promise<void>;
  on(event: string, listener: () => void): void;
};

type AmqpChannel = {
  assertQueue(queue: string, options: any): Promise<any>;
  sendToQueue(queue: string, content: Buffer, options: any): boolean;
  close(): Promise<void>;
};

declare module 'asterisk-ami-client' {
  import { EventEmitter } from 'events';

  export interface AmiConnectionOptions {
    host: string;
    port: number;
  }

  export interface AmiOptions {
    reconnect?: boolean;
    keepAlive?: boolean;
    emitEventsByTypes?: boolean;
    emitResponsesById?: boolean;
  }

  export interface AmiAction {
    Action: string;
    [key: string]: any;
  }

  export interface AmiEvent {
    Event: string;
    [key: string]: any;
  }

  export interface AmiResponse {
    Response: string;
    ActionID?: string;
    Message?: string;
    [key: string]: any;
  }

  export class AsteriskAmi extends EventEmitter {
    constructor(options?: AmiOptions);

    connect(username: string, secret: string, options: AmiConnectionOptions): Promise<AsteriskAmi>;

    action(action: AmiAction): Promise<AmiResponse>;

    disconnect(): void;

    on(event: 'connect', listener: () => void): this;
    on(event: 'event', listener: (event: AmiEvent) => void): this;
    on(event: 'response', listener: (response: AmiResponse) => void): this;
    on(event: 'disconnect', listener: () => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    on(event: string, listener: (...args: any[]) => void): this;
  }

  export default AsteriskAmi;
}
