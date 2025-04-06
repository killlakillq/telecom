FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY lerna.json ./
COPY tsconfig*.json ./

COPY libs ./libs
COPY apps/events ./apps/events
COPY ./.env ./.env
COPY ./.env.example ./.env.example 

RUN npm install

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3001

CMD ["npm", "run", "start"]