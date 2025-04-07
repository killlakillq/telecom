import { EventParams } from '@/common/types/events';
import { saveEventQuery } from '@/database/queries';
import { Event } from '@telecom/grpc';
import crypto from 'crypto';
import { PoolClient } from 'pg';

export class EventRepository {
  public constructor(private readonly client: PoolClient) {}

  public async create(params: EventParams): Promise<Event> {
    const values = [
      crypto.randomUUID(),
      params.eventType,
      params.eventData,
      params.source,
      params.timestamp,
    ];

    const result = await this.client.query(saveEventQuery, values);
    return result.rows[0] as Event;
  }

  public async find(params: {
    callerId: string;
    eventType: string;
    eventData: string;
    source: string;
    startTimestamp: Date;
    endTimestamp: Date;
    limit: number;
    offset: number;
  }) {
    const values: any[] = [params.callerId];
    let i = 2;

    let query = `
    SELECT * FROM call_events
    WHERE event_data->>'CallerIDNum' = $1
  `;

    if (params.eventType) {
      query += ` AND event_type = $${i++}`;
      values.push(params.eventType);
    }

    if (params.source) {
      query += ` AND source = $${i++}`;
      values.push(params.source);
    }

    if (params.startTimestamp) {
      query += ` AND timestamp >= $${i++}`;
      values.push(params.startTimestamp);
    }

    if (params.endTimestamp) {
      query += ` AND timestamp <= $${i++}`;
      values.push(params.endTimestamp);
    }

    query += ` ORDER BY timestamp DESC`;

    if (params.limit) {
      query += ` LIMIT $${i++}`;
      values.push(params.limit);
    }

    if (params.offset) {
      query += ` OFFSET $${i++}`;
      values.push(params.offset);
    }

    const result = await this.client.query(query, values);
    return result.rows as {
      event_type: string;
      event_data: string;
      source: string;
      timestamp: Date;
      id: string;
    }[];
  }
}
