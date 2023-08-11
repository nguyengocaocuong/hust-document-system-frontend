FROM node:18-alpine as development
WORKDIR /app

COPY ./build .
RUN yarn install

COPY . .
CMD ["yarn","start"]
EXPOSE 3000
