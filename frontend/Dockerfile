FROM node:16 as build-deps

RUN apt-get update -y \
    && apt-get install -y default-jre \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run codegen \
    && npm run build

FROM nginx:1.12-alpine
COPY --from=build-deps /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
