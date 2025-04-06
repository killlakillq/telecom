type AmqpConnection = {
  createChannel(): Promise<AmqpChannel>;
  close(): Promise<void>;
  on(event: string, listener: () => void): void;
};

type AmqpChannel = {
  assertQueue(queue: string, options: any): Promise<any>;
  consume(queue: string, onMessage: (msg: any) => void, options: any): Promise<any>;
  ack(message: any): void;
  nack(message: any, allUpTo: boolean, requeue: boolean): void;
  close(): Promise<void>;
};

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface Event {
  eventType: string;
  eventData: any;
  source: string;
  timestamp: number;
}
