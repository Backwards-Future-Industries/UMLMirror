#https://gist.github.com/aradalvand/04b2cad14b00e5ffe8ec96a3afbb34fb
FROM node:18-alpine AS builder
LABEL org.opencontainers.image.source="https://github.com/<your-github-username>/<your-repo-name>"
WORKDIR /app
COPY package*.json .
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build && npm prune --production

FROM alpine
RUN apk add --update nodejs npm
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]