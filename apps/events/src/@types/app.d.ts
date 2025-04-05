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
