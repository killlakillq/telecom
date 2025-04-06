# Events Storage Service

This service listens to a RabbitMQ queue for calls events and stores them in a PostgreSQL database. It also provides a gRPC interface for querying stored events.

## Features

- Listens to RabbitMQ queue for calls events
- Stores events in PostgreSQL database
- Provides gRPC API for event retrieval
- Automatic database migration on startup
- Automatic reconnection on connection loss
- Graceful shutdown handling
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- RabbitMQ server

## Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your configuration

## Configuration

The following environment variables can be configured:

- `RABBITMQ_URL`: RabbitMQ connection URL (default: amqp://localhost:5672)
- `RABBITMQ_QUEUE`: RabbitMQ queue name (default: asterisk_events)
- `DB_HOST`: PostgreSQL host (default: localhost)
- `DB_PORT`: PostgreSQL port (default: 5432)
- `DB_USERNAME`: Database username (default: postgres)
- `DB_PASSWORD`: Database password (default: postgres)
- `DB_NAME`: Database name (default: telecom)
- `EVENTS_STORAGE_HOST`: gRPC server host (default: 0.0.0.0)
- `EVENTS_STORAGE_PORT`: gRPC server port (default: 50051)

## Database Schema

The service creates a `call_events` table with the following columns:

- `id`: UUID (primary key)
- `event_type`: Event type (e.g., Newchannel, Hangup, Bridge)
- `event_data`: Full event data as JSONB
- `source`: Source of the event
- `timestamp`: Event timestamp

## Usage

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run build
npm start
```

## gRPC API

The service exposes the following gRPC methods:

- `getEvents`: Retrieves events based on filtering criteria
  - Parameters:
    - `callerId`: Caller ID to filter by
    - `eventType`: (Optional) Event type to filter by
    - `source`: (Optional) Source to filter by
    - `startTimestamp`: (Optional) Start timestamp for filtering
    - `endTimestamp`: (Optional) End timestamp for filtering
    - `limit`: (Optional) Maximum number of events to return
    - `offset`: (Optional) Number of events to skip

## Error Handling

The service includes automatic reconnection logic for both RabbitMQ and PostgreSQL connections. If either connection is lost, the service will attempt to reconnect.

Messages are processed with manual acknowledgment, ensuring that failed messages are requeued and not lost.

## Docker Support

The service can be run in a Docker container using the provided Dockerfile:

```bash
docker build -t events-storage .
docker run -p 50051:50051 events-storage
```
