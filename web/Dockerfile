FROM node:14.17.3-alpine3.14 as dependencies

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

FROM node:14.17.3-alpine3.14

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

WORKDIR /usr/src/app

COPY --from=dependencies --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules

COPY --chown=nodejs:nodejs package*.json ./

COPY --chown=nodejs:nodejs server.js ./

USER nodejs

EXPOSE 5000

CMD ["npm","start"]
