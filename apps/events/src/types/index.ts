export interface AsteriskConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

export interface RabbitMQConfig {
  url: string;
  queue: string;
}