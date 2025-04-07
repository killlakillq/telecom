import {
  ChannelCredentials,
  GrpcObject,
  ServiceDefinition,
  UntypedServiceImplementation,
} from '@grpc/grpc-js';
import { EventsStorage } from '@telecom/grpc';

export type EventsStorageClientProto = GrpcObject & {
  EventsStorage: {
    new (address: string, credentials: ChannelCredentials): EventsStorage;
  };
};

export type EventsStorageServerProto = GrpcObject & {
  EventsStorage: {
    service: ServiceDefinition<UntypedServiceImplementation>;
  };
};

export type GrpcTimestamp = {
  seconds: number | string;
  nanos: number;
};
