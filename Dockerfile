FROM node:18-alpine as development
WORKDIR /app

RUN apk update && \
    apk add --no-cache python3 make g++ pkgconfig cairo-dev pango-dev libpng-dev jpeg-dev giflib-dev librsvg-dev

COPY . .

RUN yarn install

RUN yarn run build


FROM nginx:1.19

COPY --from=development /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
