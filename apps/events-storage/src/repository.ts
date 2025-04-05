import {
  GetEventRequest,
  GetEventResponse,
  GetEventsRequest,
  GetEventsResponse,
} from '@telecom/grpc';
import { PoolClient } from 'pg';
export class EventRepository {
  public constructor(private readonly client: PoolClient) {}

  // public async saveEvent(params: StoreEventRequest): Promise<StoreEventResponse> {
  //   const query = `
  //     INSERT INTO call_events (
  //       event_type,
  //       event_data,
  //       channel_id,
  //       caller_id,
  //       called_number,
  //       duration,
  //       queue_name,
  //       agent_name,
  //       created_at
  //     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
  //     RETURNING id
  //   `;

  //   const values = [
  //     params.eventType,
  //     params.eventData,
  //     // event.channelId,
  //     // event.callerId,
  //     // event.calledNumber,
  //     // event.duration,
  //     // event.queueName,
  //     // event.agentName,
  //   ];

  //   const result = await this.client.query(query, values);
  //   return result.rows[0].id;
  // }

  public async getEvents(params: GetEventsRequest): Promise<GetEventsResponse[]> {
    let query = `
      SELECT * FROM call_events
    `;
    const values: any[] = [];

    // if (params.startTime || params.endTime) {
    //   query += ' WHERE ';
    //   const conditions: string[] = [];

    //   if (params.startTime) {
    //     conditions.push('created_at >= $1');
    //     values.push(params.startTime);
    //   }

    //   if (params.endTime) {
    //     conditions.push('created_at <= $' + (values.length + 1));
    //     values.push(params.endTime);
    //   }

    //   query += conditions.join(' AND ');
    // }

    query += ' ORDER BY created_at DESC';

    const result = await this.client.query(query, values);
    return result.rows;
  }

  public async getEvent(params: GetEventRequest): Promise<GetEventResponse> {
    const query = `
      SELECT * FROM call_events
      WHERE id = $1
    `;

    const result = await this.client.query(query, [params.eventId]);
    return result.rows[0];
  }
}
