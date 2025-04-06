# Telecom Service

A Docker-based telephony service with Asterisk PBX, event processing, and API functionality.

## Features

- Asterisk PBX with SIP lines
- Event processing service
- PostgreSQL + TimescaleDB for call events storage
- REST API with JWT authentication
- Docker deployment

## Prerequisites

- Docker
- Docker Compose
- Node.js >= 20 (for local development)

## Project Structure

```
.
├── apps/
│   ├── api/              # API service
│   ├── events/           # Event processing service
│   └── events-storage/   # Event storage service
├── asterisk/            # Asterisk configuration
│   ├── config/
│   └── logs/
└── docker-compose.yml
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
LOG_LEVEL=debug
ENV_NAME=development
VERSION=1.0.0
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret
JWT_EXPIRES_IN=3600
PRETTY_LOGGING=1

# Asterisk Configuration
ASTERISK_AMI_HOST=0.0.0.0
ASTERISK_AMI_PORT=5038
ASTERISK_AMI_USERNAME=admin
ASTERISK_AMI_PASSWORD=admin

# RabbitMQ Configuration
RABBIT_URL=amqp://localhost:5672
RABBIT_QUEUE=events
RABBITMQ_USERNAME=guest
RABBITMQ_PASSWORD=guest

# PostgreSQL Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_API_DATABASE=api
POSTGRES_EVENTS_DATABASE=events

# Events Storage Configuration
EVENTS_STORAGE_ADDRESS=localhost:50051
EVENTS_STORAGE_PORT=50051
EVENTS_STORAGE_HOST=localhost

# Events Configuration
EVENTS_ADDRESS=localhost:50052
EVENTS_HOST=localhost
EVENTS_PORT=50052

# API Configuration
API_ADDRESS=localhost:3000
API_HOST=0.0.0.0
API_PORT=3000
```

## Running the Service

1. Clone the repository:

   ```bash
   git clone https://github.com/killlakillq/telecom.git
   cd telecom
   ```

2. Create the `.env` file:

   ```bash
   cp .env.example .env
   ```

3. Start the services:

   ```bash
   docker-compose up -d
   ```

4. Check the logs:
   ```bash
   docker-compose logs -f
   ```

## API Endpoints

### Authentication

- `POST /api/register` - Register a new user
- `POST /api/login` - Login and get JWT token

### Protected Endpoints

- `GET /api/users/me` - Get user profile
- `GET /api/events` - Get user's events

## SIP Configuration

The service includes two SIP extensions:

- Extension 1001 (password: 1001)
- Extension 1002 (password: 1002)

To test calls between extensions:

1. Configure your SIP client with the following settings:

   - Server: Your server IP
   - Port: 5060
   - Username: 1001 or 1002
   - Password: 1001 or 1002

2. Make calls between extensions to generate events

## Development

### Running Services Locally

1. Install dependencies:

   ```bash
   cd apps/api && npm install
   cd ../events-storage && npm install
   ```

2. Start services in development mode:

   ```bash
   # Terminal 1 - API
   cd apps/api && npm run start:dev

   # Terminal 2 - Event Processor
   cd apps/events && npm run start:dev
   ```

## Troubleshooting

1. Check service status:

   ```bash
   docker-compose ps
   ```

2. View logs:

   ```bash
   docker-compose logs -f [service-name]
   ```

3. Restart services:

   ```bash
   docker-compose restart [service-name]
   ```

4. Rebuild services:
   ```bash
   docker-compose build [service-name]
   ```
