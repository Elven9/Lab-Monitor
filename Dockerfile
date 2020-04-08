FROM node:13.12.0-alpine3.11

COPY . .

RUN npm install && npm run build

CMD [ "node", "server.js" ]