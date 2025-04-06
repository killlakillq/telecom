FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY lerna.json ./
COPY tsconfig*.json ./

COPY libs ./libs
COPY apps/api ./apps/api
COPY ./.env ./.env
COPY ./.env.example ./.env.example 

RUN npm install

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3002

CMD ["npm", "run", "start"] 