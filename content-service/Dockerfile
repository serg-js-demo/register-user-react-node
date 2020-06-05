FROM node:lts AS build-deps

WORKDIR /
COPY package*.json ./

RUN npm i
COPY . .
RUN npm run build

CMD ["node", "build/app.js"]