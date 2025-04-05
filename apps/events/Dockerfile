FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY lerna.json ./
COPY tsconfig.base.json ./

COPY apps/events/package*.json ./apps/events/
COPY apps/events/tsconfig.json ./apps/events/

COPY libs/ ./libs/

COPY .env ./
COPY .env.example ./

RUN npm install
RUN npm install -g tsc-alias

COPY apps/events/ ./apps/events/

RUN npm run build -w @telecom/logger
RUN npm run build -w @telecom/config

RUN npm run build -w @telecom/events
RUN cd apps/events && tsc-alias

RUN ls -la /app/apps/events/dist

WORKDIR /app/apps/events

EXPOSE 3000

CMD ["npm", "run", "start"]