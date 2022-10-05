# build environment
FROM node:14.4-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent --network-timeout 600000
COPY . ./
RUN yarn build

# production environment
FROM nginx:stable-alpine

# Add bash
RUN apk add --no-cache bash

RUN mkdir /appconf

COPY --from=build /app/build /usr/share/nginx/html
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY .env /appconf
COPY docker/env.sh /appconf

RUN chmod +x /appconf/env.sh

EXPOSE 80
CMD ["/bin/bash", "-c", "/appconf/env.sh /appconf/.env /usr/share/nginx/html/env-config.js && nginx -g \"daemon off;\""]
