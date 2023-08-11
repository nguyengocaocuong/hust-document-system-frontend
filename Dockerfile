FROM node:18-alpine as development
WORKDIR /app

RUN apk update && \
    apk add --no-cache python3 make g++ pkgconfig cairo-dev pango-dev libpng-dev jpeg-dev giflib-dev librsvg-dev


COPY ./package.json .
RUN yarn install

COPY . .


CMD ["yarn","start"]
EXPOSE 3000
