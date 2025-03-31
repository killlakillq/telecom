# Asterisk Events Service

This service connects to Asterisk via AMI (Asterisk Manager Interface) and forwards call-related events to RabbitMQ.

## Features

- Connects to Asterisk AMI
- Listens for call-related events (Newchannel, Hangup, Bridge, QueueMember)
- Forwards events to RabbitMQ queue
- Automatic reconnection on connection loss
- Graceful shutdown handling

## Prerequisites

- Node.js (v14 or higher)
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

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## Events

The service forwards the following Asterisk events to RabbitMQ:

- `Newchannel`: When a new channel is created
- `Hangup`: When a call is hung up
- `Bridge`: When channels are bridged
- `QueueMember`: When queue member status changes

Each event message includes:
- timestamp
- event type
- full event data from Asterisk

## Error Handling

The service includes automatic reconnection logic for both Asterisk AMI and RabbitMQ connections. If either connection is lost, the service will attempt to reconnect every 5 seconds. 