# Events Storage Service

This service listens to a RabbitMQ queue for telephony events and stores them in a PostgreSQL database.

## Features

- Listens to RabbitMQ queue for telephony events
- Stores events in PostgreSQL database
- Automatic reconnection on connection loss
- Graceful shutdown handling
- TypeORM for database operations
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

## Database Schema

The service creates a `telephony_events` table with the following columns:

- `id`: UUID (primary key)
- `eventType`: Event type (e.g., Newchannel, Hangup, Bridge)
- `eventData`: Full event data as JSONB
- `channelId`: Channel identifier
- `callerId`: Caller ID
- `calledNumber`: Called number
- `duration`: Call duration in seconds
- `queueName`: Queue name (if applicable)
- `agentName`: Agent name (if applicable)
- `createdAt`: Event creation timestamp
- `updatedAt`: Event update timestamp

## Usage

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## Error Handling

The service includes automatic reconnection logic for both RabbitMQ and PostgreSQL connections. If either connection is lost, the service will attempt to reconnect every 5 seconds.

Messages are processed with manual acknowledgment, ensuring that failed messages are requeued and not lost. 