FROM node:13.12.0-alpine3.11

COPY . .

RUN mv ./Container/package.json ./package.json && npm install

EXPOSE 3000/tcp

CMD [ "node", "server.js" ]