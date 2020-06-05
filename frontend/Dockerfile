FROM node:lts AS build-deps

WORKDIR /app
COPY package*.json ./

RUN npm i
COPY . .
RUN npm run build


FROM nginx:alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
