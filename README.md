# Emporio

Emporio is the Commerce system for StickerApp.

## Apps

The apps folder contains two apps:

### `api`

This app is the heart of the service and where all the order logic is placed. It's a Node.js app based on fastify.

See more details in [README.md](./apps/api/README.md) in the api app.

### `ui`

This app is the Product Information Management system (PIM), that uses the `api` app for fetching and updating data.

See more details in [README.md](./apps/ui/README.md) in the ui app.

## Packages

Under the packages folder there's a couple of config packages that aren't that interesting and one package called `nomisma`.

### Nomisma

Nomisma is a component library for Commerce related admin UI components. It's a separate component library from `Athena` used in `Aphrodite` since it's purpose is to serve admin UIs whereas `Athena` serves customer facing applications.

See more details in [README.md](./packages/nomisma/README.md) in the nomisma package.

## Developing

The repo is using [Turborepo](https://turbo.build/repo) which means that you can run `npm run dev` in the root of the repo to start the `dev` task in all apps and packages in this repo. This starts watches and dev servers in all packages/apps.
