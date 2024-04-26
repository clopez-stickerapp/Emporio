FROM node:21-slim as build

WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Set environment variables
ENV API_PORT=5012
ENV API_HOST=0.0.0.0

# Copy app source and build
COPY . .
RUN npm install
RUN npm run build -w @stickerapp-org/emporio-api-contract
RUN npm run build -w @stickerapp-org/emporio-api

EXPOSE 5012

ENTRYPOINT ["node", "apps/api/dist/src/app.js"]