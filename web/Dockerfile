FROM node:20-alpine as dependencies

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

FROM node:20-alpine

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

WORKDIR /usr/src/app

COPY --from=dependencies --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules

COPY --chown=nodejs:nodejs package*.json ./

COPY --chown=nodejs:nodejs server.js ./

COPY --chown=nodejs:nodejs entrypoint.sh ./

RUN chmod +x entrypoint.sh

USER nodejs

EXPOSE 5000

CMD ["./entrypoint.sh"]
