# Prerequisites

> To run the app, you need Node.js version 18 or higher.

# Installation:

1. Install root dependencies

```
npm install
```

2. Install client and backend app dependencies

```
npm run install:apps
```

<br/><br/>

# Running applications:

## To run a local development environment, use:

```
npm run dev
```

This command will run both the front-end and the back-end development servers concurrently from one terminal. Open http://localhost:3300 to use the application.
<br/>

## To run a local production environment, use:

```
npm run build:client
```

This command will prepare the static front-end build.

```
npm run server:prod
```

This command will run the backend on http://localhost:5500. The backend app serves the front-end build.

<br/>

## To run a Dockerized production environment, use:

```
npm run build:client
```

This command will prepare the static front-end build.

```
docker build -t booksapp:0.1 .
```

This command will build the image with both frontend and backend apps.

```
docker-compose -f docker-compose.yaml up reactnode
```

This command will run the containerized app on http://localhost:30000

<br/><br/>

# Running tests:

## To run client app tests use:

```
npm run test:client
```

<br/><br/>

# Extra features:

- Auto theming. The color scheme automatically matches the dark or light system theme.
- Service-Worker with production mode allows to store frontend static files and latest api responses in the browser and use them even without an internet connection.
- Offline mode. If you turn the network off, you can still refresh the page and interact with the app.
- Atomic components structure is easy to use and scale.

  You can read more about my view of react apps in [my article](https://medium.com/@kirichuk/7-must-have-features-for-any-react-app-10b086038d9a)

- In-memory cache for third-party dependent requests allows you to not wait for long requests each time.

<br/><br/>

# Future improvements:

- Add pagination, as now the app shows only the 20 most relevant results.
- Add TypeScript to the backend.
- Add swagger to the backend to build an openApi schema and use the converter to build types for the front-end app from the openApi schema. So we have a contract between tiers.
- Add a global state manager to the frontend so it's simpler to scale the app.
- Add a schema validator to both frontend and backend apps to validate request and response body schemes. For example, Zod
- To scale the app codebase, we would add a monorepo build system such as Nx. It would allow for common components between applications and speed up deployment. You can check out [my speech about NX monorepo features](https://youtu.be/0B84XEP81Ko?t=38).
- Optimize Docker Compose to install server dependencies after the container starts.
