# Asterisk Events Service

This service connects to Asterisk via AMI (Asterisk Manager Interface), captures call-related events, and forwards them to a RabbitMQ queue for processing by other services.

## Features

- Connects to Asterisk AMI using `asterisk-ami-client`
- Listens for all Asterisk events (not limited to specific types)
- Enriches events with metadata (timestamp, source hostname)
- Forwards events to RabbitMQ queue
- Automatic reconnection for both Asterisk and RabbitMQ
- Graceful shutdown handling
- TypeScript implementation with strong typing

## Prerequisites

- Node.js (v20 or higher)
- Asterisk server with AMI enabled
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

- `ASTERISK_HOST`: Asterisk server host (default: localhost)
- `ASTERISK_PORT`: Asterisk AMI port (default: 5038)
- `ASTERISK_USERNAME`: AMI username (default: admin)
- `ASTERISK_PASSWORD`: AMI password (default: admin)
- `RABBITMQ_URL`: RabbitMQ connection URL (default: amqp://localhost:5672)
- `RABBITMQ_QUEUE`: RabbitMQ queue name (default: asterisk_events)

## Usage

Development mode::

```bash
npm run start:dev
```

Production mode:

```bash
npm run build
npm start
```

Docker:

```bash
docker build -t events .
docker run -p 3001:3001 events
```

## Event Format

The service forwards all Asterisk events to RabbitMQ with the following structure:
```json
{
"eventType": "EventName",
"eventData": { / raw event data from Asterisk / },
"source": "asterisk@hostname",
"timestamp": "2023-06-01T12:34:56.789Z"
}
```


Common event types include:
- `Newchannel`: When a new channel is created
- `Hangup`: When a call is hung up
- `Bridge`: When channels are bridged
- `QueueMember`: When queue member status changes
- Many others provided by Asterisk AMI

## Error Handling

The service implements robust error handling:
- Automatic reconnection for both Asterisk AMI and RabbitMQ
- Graceful shutdown on SIGINT signals
- Structured logging with context information
- Error details are logged but service attempts to continue operation

## Development

This service is part of a microservice architecture and uses shared libraries:
- `@telecom/config` - For configuration management
- `@telecom/logger` - For structured logging