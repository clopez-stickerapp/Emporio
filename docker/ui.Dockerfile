FROM node:20.12.2-alpine as builder

# ARG NODE_AUTH_TOKEN

# Set npm token as environment variable
# ENV NODE_AUTH_TOKEN=$NODE_AUTH_TOKEN

WORKDIR /app

# TODO make explicit copy actions
COPY . .

# RUN echo -e "\n//https://npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}" >> /app/.npmrc


RUN npm ci && npm run build -- --filter=@stickerapp-org/emporio-ui
RUN npm prune --omit dev

FROM node:20.12.2-alpine
USER node
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/ui/build ./apps/ui/build
# COPY --from=builder /app/apps/ui/node_modules ./apps/ui/node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/ui/package.json ./apps/ui/package.json

EXPOSE 3000
ENTRYPOINT ["node", "/app/apps/ui/build"]
