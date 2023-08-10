# Installation:

1. Install root dependencies

```
npm install
```

2. Install client and backend apps dependencies

```
npm run install:apps
```

<br/><br/>

# Running applications:

## To run local development environment use:

```
npm run dev
```

This command will run both the front-end and the back-end dev servers concurently from one terminal.

<br/>

## To run local production environment use:

```
npm run build:client
```

This command will prepare the static front-end build.

```
npm run server:prod
```

This command will run the backend. The backend app automatically uses the front-end build.

<br/>

## To run conteinerized production environment use:

```
npm run build:client
```

This command will prepare the static front-end build.

```
docker build -t booksapp:0.1 .
```

This command will build the image with both fronend and backed apps.

```
docker-compose -f docker-compose.yaml up reactnode
```

This command will run the container on http://localhost:30000

<br/><br/>

# Running tests:

## To run client app tests use:

```
npm run test:client
```

<br/><br/>

# Extra features:

- auto themenig
- service worker
- offline mode and message
-

future improvements:

- add pagination as now the app shows only 20 most relevant results.
- add typescript to the backend
- add swagger to the backend to build an openApi schema and use converter to build types for the front-end app from the openApi schema. So we have a contract between tiers.
