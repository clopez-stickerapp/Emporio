FROM node:21-slim as build

WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

ENV API_URL=http://api:5012/

# Copy app source and build
COPY . .
RUN npm install
RUN npm run build -w @stickerapp-org/emporio-api-contract
RUN npm run build -w @stickerapp-org/emporio-ui

EXPOSE 3000
ENTRYPOINT ["sh", "-c", "cd /usr/src/app/apps/ui && node build"]