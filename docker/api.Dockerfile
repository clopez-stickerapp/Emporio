FROM node:20.12.2-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY . .

RUN npm ci && npm run build -w @stickerapp-org/emporio-api
RUN npm prune --omit dev

FROM node:20.12.2-alpine
USER node
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

EXPOSE 5012
ENTRYPOINT ["node", "/app/apps/api/dist/src/app.js"]