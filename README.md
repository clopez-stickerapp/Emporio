# Emporio

Emporio is the Commerce system for StickerApp.

## How to run in development

The repo is using [Turborepo](https://turbo.build/repo) which means that you can run `npm run dev` in the root of the repo to start the `dev` task in all apps and packages in this repo. This starts watches and dev servers in all packages/apps.

## How to deploy

1. Push your changes to a branch
2. Run the `Emporio api build and push docker image` github action
3. Copy the new docker image tag from the `deploy1337` slack channel
4. Update `docker-compose-prod.yml` with the new tag and push the change
5. Run the `Emporio Deploy` github action