# Telecom Service

A Docker-based telephony service with Asterisk PBX, event processing, and API functionality.

## Features

- Asterisk PBX with SIP lines
- Event processing service
- TimescaleDB for call events
- REST API with JWT authentication
- Docker deployment

## Prerequisites

- Docker
- Docker Compose
- Node.js >= 18 (for local development)

## Project Structure

```
.
├── apps/
│   ├── api/              # API service
│   ├── database/         # Database service
│   └── event-processor/  # Event processor service
├── asterisk/            # Asterisk configuration
│   ├── config/
│   └── logs/
└── docker-compose.yml
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Asterisk AMI
ASTERISK_AMI_USERNAME=admin
ASTERISK_AMI_PASSWORD=admin

# RabbitMQ
RABBITMQ_USERNAME=admin
RABBITMQ_PASSWORD=admin

# PostgreSQL
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=telecom

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h
```

## Running the Service

1. Clone the repository:
   ```bash
   git clone <repository-url>
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
- `POST /api/logout` - Logout and invalidate token

### Protected Endpoints

- `GET /api/profile` - Get user profile
- `GET /api/calls` - Get user's call history
  - Query parameters:
    - `startDate` (optional) - Filter by start date
    - `endDate` (optional) - Filter by end date

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
   cd ../database && npm install
   cd ../event-processor && npm install
   ```

2. Start services in development mode:
   ```bash
   # Terminal 1 - API
   cd apps/api && npm run start:dev

   # Terminal 2 - Database
   cd apps/database && npm run start:dev

   # Terminal 3 - Event Processor
   cd apps/event-processor && npm run start:dev
   ```

### Logs

Logs are stored in the following locations:
- API: `apps/api/logs/`
- Database: `apps/database/logs/`
- Event Processor: `apps/event-processor/logs/`
- Asterisk: `asterisk/logs/`

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

## License

MIT 