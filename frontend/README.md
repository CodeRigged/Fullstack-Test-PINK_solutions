# Frontend – React + TypeScript + Vite

This is the frontend package of a fullstack monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces). It is a modern React app using TypeScript, Vite, and Material UI, with built-in internationalization, FHIR integration, and shared types.

## Features

- Patient List View: Fetches and displays a list of patients from a FHIR-compliant backend API
- Patient Detail View: Click a patient to view detailed information (name, gender, birth date, address, etc.)
- FHIR Integration: Uses a FHIR client to connect to a mock or real FHIR server via the backend
- Internationalization (English, German, French) via [react-intl](https://formatjs.io/docs/react-intl/)
- Theme switch (dark/light) and language selection in Settings
- State management with [zustand](https://github.com/pmndrs/zustand)
- UI built with [Material UI (MUI)](https://mui.com/)
- Modular component structure (navigation, feedback, inputs, etc.)
- Error handling for network requests, with user-friendly error messages
- Fast development with [Vite](https://vitejs.dev/)
- Shared types and enums from the `shared` package

## Usage in Monorepo

This package is intended to be used as part of the monorepo. To install dependencies and run the frontend in development mode, use the root workspace commands:

```bash
pnpm install
pnpm --filter frontend dev
```

You can also build or lint the frontend specifically:

```bash
pnpm --filter frontend build
pnpm --filter frontend lint
```

## Project Structure

- `public/` – Static assets
- `index.html` – Main HTML entry point
- `src/` – Application source code:
  - `App.tsx`, `main.tsx` – App entry points
  - `components/` – UI components
    - `feedback/` – Loading overlays, alerts
    - `inputs/` – Buttons, select boxes
    - `navigation/` – Protected routes, menus, navigation bar, tabs
  - `i18n/` – Internationalization setup and translation files
  - `layouts/` – App and page layout components
  - `pages/` – Route pages:
    - `Landing/` – Patient List
    - `PatientDetails/` – Patient Detail
    - `LoginPage.tsx`, `LogoutPage.tsx`, `Profile/`, `Settings/`
  - `router/` – App routing
  - `stores/` – Zustand state stores
  - `styles/` – SCSS styles and variables
  - `theme/` – Theme configuration
  - `types/` – Global and utility type definitions
  - `utils/` – API helpers (FHIR, backend), hooks, utilities

## Development Notes

- The frontend expects the backend API to be running on http://localhost:5000 for development.
- Patient data is fetched from the backend, which acts as a FHIR proxy or mock server.
- Shared types and enums are imported from the `shared` package (see monorepo root).
- Uses TypeScript strict mode and Prettier for code formatting.
- For API endpoints and backend details, see the backend/README.md.

---

Happy coding!
