FROM node:18-alpine as development
WORKDIR /app

COPY . .

RUN yarn install
CMD ["yarn","start"]
EXPOSE 3000
