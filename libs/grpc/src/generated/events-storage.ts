// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v3.20.3
// source: events-storage.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "eventsStorage";

export interface CreateEventRequest {
  eventType: string;
  eventData: string;
  source: string;
  timestamp: number;
}

export interface CreateEventResponse {
  event: Event | undefined;
}

export interface GetEventsRequest {
  callerId: string;
  eventType: string;
  eventData: string;
  source: string;
  startTimestamp: number;
  endTimestamp: number;
  limit: number;
  offset: number;
}

export interface GetEventsResponse {
  events: Event[];
  totalCount: number;
}

export interface Event {
  id: string;
  eventType: string;
  eventData: string;
  source: string;
  timestamp: number;
}

function createBaseCreateEventRequest(): CreateEventRequest {
  return { eventType: "", eventData: "", source: "", timestamp: 0 };
}

export const CreateEventRequest: MessageFns<CreateEventRequest> = {
  encode(message: CreateEventRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.eventType !== "") {
      writer.uint32(18).string(message.eventType);
    }
    if (message.eventData !== "") {
      writer.uint32(26).string(message.eventData);
    }
    if (message.source !== "") {
      writer.uint32(34).string(message.source);
    }
    if (message.timestamp !== 0) {
      writer.uint32(40).int32(message.timestamp);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CreateEventRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateEventRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.eventType = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.eventData = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.source = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }

          message.timestamp = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateEventRequest {
    return {
      eventType: isSet(object.eventType) ? globalThis.String(object.eventType) : "",
      eventData: isSet(object.eventData) ? globalThis.String(object.eventData) : "",
      source: isSet(object.source) ? globalThis.String(object.source) : "",
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
    };
  },

  toJSON(message: CreateEventRequest): unknown {
    const obj: any = {};
    if (message.eventType !== "") {
      obj.eventType = message.eventType;
    }
    if (message.eventData !== "") {
      obj.eventData = message.eventData;
    }
    if (message.source !== "") {
      obj.source = message.source;
    }
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateEventRequest>, I>>(base?: I): CreateEventRequest {
    return CreateEventRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateEventRequest>, I>>(object: I): CreateEventRequest {
    const message = createBaseCreateEventRequest();
    message.eventType = object.eventType ?? "";
    message.eventData = object.eventData ?? "";
    message.source = object.source ?? "";
    message.timestamp = object.timestamp ?? 0;
    return message;
  },
};

function createBaseCreateEventResponse(): CreateEventResponse {
  return { event: undefined };
}

export const CreateEventResponse: MessageFns<CreateEventResponse> = {
  encode(message: CreateEventResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.event !== undefined) {
      Event.encode(message.event, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CreateEventResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateEventResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.event = Event.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateEventResponse {
    return { event: isSet(object.event) ? Event.fromJSON(object.event) : undefined };
  },

  toJSON(message: CreateEventResponse): unknown {
    const obj: any = {};
    if (message.event !== undefined) {
      obj.event = Event.toJSON(message.event);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateEventResponse>, I>>(base?: I): CreateEventResponse {
    return CreateEventResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateEventResponse>, I>>(object: I): CreateEventResponse {
    const message = createBaseCreateEventResponse();
    message.event = (object.event !== undefined && object.event !== null) ? Event.fromPartial(object.event) : undefined;
    return message;
  },
};

function createBaseGetEventsRequest(): GetEventsRequest {
  return {
    callerId: "",
    eventType: "",
    eventData: "",
    source: "",
    startTimestamp: 0,
    endTimestamp: 0,
    limit: 0,
    offset: 0,
  };
}

export const GetEventsRequest: MessageFns<GetEventsRequest> = {
  encode(message: GetEventsRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.callerId !== "") {
      writer.uint32(10).string(message.callerId);
    }
    if (message.eventType !== "") {
      writer.uint32(18).string(message.eventType);
    }
    if (message.eventData !== "") {
      writer.uint32(26).string(message.eventData);
    }
    if (message.source !== "") {
      writer.uint32(34).string(message.source);
    }
    if (message.startTimestamp !== 0) {
      writer.uint32(40).int32(message.startTimestamp);
    }
    if (message.endTimestamp !== 0) {
      writer.uint32(48).int32(message.endTimestamp);
    }
    if (message.limit !== 0) {
      writer.uint32(56).int32(message.limit);
    }
    if (message.offset !== 0) {
      writer.uint32(64).int32(message.offset);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GetEventsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEventsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.callerId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.eventType = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.eventData = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.source = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }

          message.startTimestamp = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }

          message.endTimestamp = reader.int32();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }

          message.limit = reader.int32();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }

          message.offset = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetEventsRequest {
    return {
      callerId: isSet(object.callerId) ? globalThis.String(object.callerId) : "",
      eventType: isSet(object.eventType) ? globalThis.String(object.eventType) : "",
      eventData: isSet(object.eventData) ? globalThis.String(object.eventData) : "",
      source: isSet(object.source) ? globalThis.String(object.source) : "",
      startTimestamp: isSet(object.startTimestamp) ? globalThis.Number(object.startTimestamp) : 0,
      endTimestamp: isSet(object.endTimestamp) ? globalThis.Number(object.endTimestamp) : 0,
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0,
    };
  },

  toJSON(message: GetEventsRequest): unknown {
    const obj: any = {};
    if (message.callerId !== "") {
      obj.callerId = message.callerId;
    }
    if (message.eventType !== "") {
      obj.eventType = message.eventType;
    }
    if (message.eventData !== "") {
      obj.eventData = message.eventData;
    }
    if (message.source !== "") {
      obj.source = message.source;
    }
    if (message.startTimestamp !== 0) {
      obj.startTimestamp = Math.round(message.startTimestamp);
    }
    if (message.endTimestamp !== 0) {
      obj.endTimestamp = Math.round(message.endTimestamp);
    }
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetEventsRequest>, I>>(base?: I): GetEventsRequest {
    return GetEventsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetEventsRequest>, I>>(object: I): GetEventsRequest {
    const message = createBaseGetEventsRequest();
    message.callerId = object.callerId ?? "";
    message.eventType = object.eventType ?? "";
    message.eventData = object.eventData ?? "";
    message.source = object.source ?? "";
    message.startTimestamp = object.startTimestamp ?? 0;
    message.endTimestamp = object.endTimestamp ?? 0;
    message.limit = object.limit ?? 0;
    message.offset = object.offset ?? 0;
    return message;
  },
};

function createBaseGetEventsResponse(): GetEventsResponse {
  return { events: [], totalCount: 0 };
}

export const GetEventsResponse: MessageFns<GetEventsResponse> = {
  encode(message: GetEventsResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(10).fork()).join();
    }
    if (message.totalCount !== 0) {
      writer.uint32(16).int32(message.totalCount);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GetEventsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEventsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.events.push(Event.decode(reader, reader.uint32()));
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.totalCount = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetEventsResponse {
    return {
      events: globalThis.Array.isArray(object?.events) ? object.events.map((e: any) => Event.fromJSON(e)) : [],
      totalCount: isSet(object.totalCount) ? globalThis.Number(object.totalCount) : 0,
    };
  },

  toJSON(message: GetEventsResponse): unknown {
    const obj: any = {};
    if (message.events?.length) {
      obj.events = message.events.map((e) => Event.toJSON(e));
    }
    if (message.totalCount !== 0) {
      obj.totalCount = Math.round(message.totalCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetEventsResponse>, I>>(base?: I): GetEventsResponse {
    return GetEventsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetEventsResponse>, I>>(object: I): GetEventsResponse {
    const message = createBaseGetEventsResponse();
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.totalCount = object.totalCount ?? 0;
    return message;
  },
};

function createBaseEvent(): Event {
  return { id: "", eventType: "", eventData: "", source: "", timestamp: 0 };
}

export const Event: MessageFns<Event> = {
  encode(message: Event, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.eventType !== "") {
      writer.uint32(18).string(message.eventType);
    }
    if (message.eventData !== "") {
      writer.uint32(26).string(message.eventData);
    }
    if (message.source !== "") {
      writer.uint32(34).string(message.source);
    }
    if (message.timestamp !== 0) {
      writer.uint32(40).int32(message.timestamp);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Event {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.eventType = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.eventData = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.source = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }

          message.timestamp = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Event {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      eventType: isSet(object.eventType) ? globalThis.String(object.eventType) : "",
      eventData: isSet(object.eventData) ? globalThis.String(object.eventData) : "",
      source: isSet(object.source) ? globalThis.String(object.source) : "",
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.eventType !== "") {
      obj.eventType = message.eventType;
    }
    if (message.eventData !== "") {
      obj.eventData = message.eventData;
    }
    if (message.source !== "") {
      obj.source = message.source;
    }
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Event>, I>>(base?: I): Event {
    return Event.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = createBaseEvent();
    message.id = object.id ?? "";
    message.eventType = object.eventType ?? "";
    message.eventData = object.eventData ?? "";
    message.source = object.source ?? "";
    message.timestamp = object.timestamp ?? 0;
    return message;
  },
};

export interface EventsStorage {
  getEvents(request: GetEventsRequest): Promise<GetEventsResponse>;
  createEvent(request: CreateEventRequest): Promise<CreateEventResponse>;
}

export const EventsStorageServiceName = "eventsStorage.EventsStorage";
export class EventsStorageClientImpl implements EventsStorage {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || EventsStorageServiceName;
    this.rpc = rpc;
    this.getEvents = this.getEvents.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }
  getEvents(request: GetEventsRequest): Promise<GetEventsResponse> {
    const data = GetEventsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "getEvents", data);
    return promise.then((data) => GetEventsResponse.decode(new BinaryReader(data)));
  }

  createEvent(request: CreateEventRequest): Promise<CreateEventResponse> {
    const data = CreateEventRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "createEvent", data);
    return promise.then((data) => CreateEventResponse.decode(new BinaryReader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
