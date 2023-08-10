FROM node:18-alpine as development
WORKDIR /react-app

COPY ./package.json .
RUN yarn install

COPY . .
CMD ["yarn","start"]
EXPOSE 3000
