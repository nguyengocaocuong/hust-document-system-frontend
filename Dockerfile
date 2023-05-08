FROM node:18-alpine as development
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn start
