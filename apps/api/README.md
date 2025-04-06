# Telecom API Service

## Overview

The Telecom API service is a RESTful API gateway that provides authentication, user management, and event storage capabilities for the Telecom platform. It serves as the main entry point for client applications to interact with the backend services.

## Features

- **Authentication**: User registration and login with JWT-based authentication
- **User Management**: Create, read, update, and delete user profiles
- **Event Storage**: Integration with the Events Storage service via gRPC
- **Security**: Request validation using Zod schemas, rate limiting, and CORS support

## Tech Stack

- **Framework**: Fastify with TypeScript
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod for schema validation
- **Database**: PostgreSQL
- **Communication**: gRPC for service-to-service communication
- **Containerization**: Docker

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get authentication token

### User Management

- `GET /users/me` - Get authorized user

### Event Storage

- `GET /events` - Get events with optional filtering

## Development

### Prerequisites

- Node.js 20+
- npm
- PostgreSQL

### Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run start:dev
   ```

### Building

### Running in Production

npm run start

## Environment Variables

The service uses the following environment variables:

- `NODE_ENV` - Environment (development, production)
- `PORT` - Port to run the server on (default: 3002)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `JWT_EXPIRES_IN` - JWT expiration time

## Architecture

This API service follows a layered architecture:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic
- **Repositories**: Handle data access
- **Routes**: Define API endpoints and connect them to controllers
- **Middleware**: Implement cross-cutting concerns like authentication

## Related Services

- **Events Storage Service**: Stores and retrieves event data
