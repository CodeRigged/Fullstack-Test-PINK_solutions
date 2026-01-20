# Express + TypeScript FHIR Backend

This is the backend API package of a fullstack monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces). It provides REST API endpoints using Express and TypeScript, focused on FHIR patient data integration. The backend shares types and logic with other packages in the monorepo for seamless integration.

## Features

- FHIR API endpoints for patient data (SMART on FHIR OAuth2 flow)
- TypeScript-first development
- Shared types and utilities across packages

## Prerequisites

- **Node.js** (see root `package.json` for required version)

## Usage in Monorepo

This package is intended for use within the monorepo. To install dependencies and run the backend in development mode, use the root workspace commands:

```bash
pnpm install
pnpm --filter backend dev
```

You can also build or start the backend specifically:

```bash
pnpm --filter backend build
pnpm --filter backend start
```

## Project Structure

- `src/` – Application source code
  - `api/controllers/` – Express route handlers (controllers)
    - `fhirController.ts` – FHIR API logic
  - `api/routes/` – Express routers
    - `fhirRoutes.ts` – FHIR API routes
- `build/` – Compiled JavaScript output
- `package.json` – Project metadata and scripts

## API Endpoints

### FHIR

- `GET /fhir/start` – Initiate SMART on FHIR OAuth2 login
- `GET /fhir/check-session` – Check authentication/session status
- `POST /fhir/stop` – Logout and destroy session
- `GET /fhir/patients` – Get list of patients
- `GET /fhir/patients/:id` – Get patient details by ID

### Health

- `GET /health` – Health check endpoint (returns `{ status: "ok" }`)

## Monorepo Packages

- `backend` – This backend API package
- `frontend` – React frontend app
- `shared` – Shared types and utilities

---

Happy coding!
