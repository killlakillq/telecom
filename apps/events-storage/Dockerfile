# Use Node.js LTS version as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY lerna.json ./
COPY tsconfig.base.json ./

# Copy the events service package.json and tsconfig
COPY apps/events-storage/package*.json ./apps/events-storage/
COPY apps/events-storage/tsconfig.json ./apps/events-storage/

# Copy shared libraries
COPY libs/ ./libs/

COPY .env ./
COPY .env.example ./

# Install dependencies
RUN npm install
RUN npm install -g tsc-alias

# Copy source code
COPY apps/events-storage/ ./apps/events-storage/

# Build the libraries first
RUN npm run build -w @telecom/logger
RUN npm run build -w @telecom/config

# Build the application
RUN npm run build -w @telecom/events-storage
RUN cd apps/events-storage && tsc-alias

# Verify the build output (debugging step)
RUN ls -la /app/apps/events-storage/dist

# Set the working directory to the events service
WORKDIR /app/apps/events-storage

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "start"]