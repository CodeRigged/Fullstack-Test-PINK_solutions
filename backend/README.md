# Express + TypeScript + MongoDB

This is the backend package of a fullstack monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces). It provides a minimal REST API template using Express, TypeScript, and MongoDB (via Mongoose).

## Features

- Simple RESTful API for Todos
- MongoDB integration with [mongoose](https://mongoosejs.com/)
- TypeScript-first development
- Shares types and logic with other packages in the monorepo

## Prerequisites

- **Node.js** (see root package.json for required version)
- **MongoDB**: You must have a running MongoDB instance (default: mongodb://localhost:27017/todos). You can use a local install or Docker:
  - Local: [Install MongoDB Community Edition](https://www.mongodb.com/try/download/community)
  - Docker: `docker run -d -p 27017:27017 --name mongo mongo`

## Usage in Monorepo

This package is intended to be used as part of the monorepo. To install dependencies and run the backend in development mode, use the root workspace commands:

```bash
pnpm install
pnpm --filter express-ts-template dev
```

You can also build or start the backend specifically:

```bash
pnpm --filter express-ts-template build
pnpm --filter express-ts-template start
```

## Project Structure

- `src/` – Application source code
  - `api/controllers/` – Express route handlers (controllers)
  - `api/models/` – Mongoose models
  - `api/routes/` – Express routers
  - `api/services/` – Business/data logic
- `build/` – Compiled JavaScript output
- `package.json` – Project metadata and scripts

## API Endpoints

- `GET /todos` – List all todos
- `POST /todos` – Add a new todo (body: `{ text: string }`)
- `PUT /todos/:id` – Edit a todo's text (body: `{ text: string }`)
- `DELETE /todos/:id` – Delete a todo by ID
- `GET /health` – Health check endpoint (returns 200 if DB is connected)

Example todo object:

```json
{
  "_id": "...",
  "text": "Buy milk",
  "completed": false
}
```

Happy coding!
