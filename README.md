# Fullstack FHIR Patient App Monorepo

This project is a fullstack example using a [pnpm](https://pnpm.io/) workspace. It contains both frontend and backend packages managed together, demonstrating a FHIR patient list and detail viewer.

## Task Requirements

### 1. Setup and Environment

- Set up a React project using Create React App with the TypeScript template.
- Configure all necessary dependencies, including a FHIR client and UI libraries (e.g., Material UI).

### 2. Features to Implement

- **Patient List View:** Fetch and display a list of patients from a mock FHIR server.
- **Patient Detail View:** When a patient from the list is clicked, display detailed information about that patient.

### 3. FHIR Integration

- Use a FHIR client to connect to a mock FHIR server.
- Fetch patient data using FHIR resources.

### 4. User Interface

- Display patient names in a list.
- On selecting a patient, show detailed patient information including name, gender, birth date, and any available address details.

### 5. Error Handling

- Implement basic error handling for network requests.
- Optionally, display meaningful error messages in the UI.

### 6. Additional Considerations

- Focus on clean and maintainable code.
- Prioritize functionality, but basic styling using any UI library or plain CSS is appreciated.
- Use TypeScript effectively to define types and interfaces where appropriate.
- Write basic unit tests if time permits.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20.19.0 or higher recommended)
- [pnpm](https://pnpm.io/) (v10.28 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (required for backend; can be run locally or via Docker)

To install pnpm globally, run:

```bash
npm install -g pnpm
```

---

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/CodeRigged/Fullstack-Test-PINK_solutions.git
   cd ./Fullstack-Test-PINK_solutions
   ```

2. **Install dependencies for all packages:**

   ```bash
   pnpm install
   ```

3. **Run the development servers:**

   ```bash
   pnpm dev
   ```

   This command starts both the frontend and backend in development mode. Output from both will be shown in your terminal.

4. **Build all packages:**

   ```bash
   pnpm build
   ```

   This compiles the frontend and backend for production.

5. **Clean build artifacts:**

   ```bash
   pnpm clean
   ```

---

## Project Structure

- `frontend/` – React TypeScript frontend app
  - Features:
    - Patient List and Patient Detail pages
    - Navigation between list and detail views
    - Fetches patient data from a FHIR server (mock or backend)
    - Internationalization (English, German, French)
    - Theme and language switch in Settings
    - State management with Zustand
    - UI with Material UI (MUI)
    - Error handling and user feedback for network requests
    - Shared types from `shared/`
- `backend/` – Backend service
  - Features:
    - FHIR-compliant API endpoints for patient data
    - Controllers and routes for FHIR resources
- `shared/` – Shared TypeScript code (types, enums, utilities) for both frontend and backend

## How to Use

1. Start the app with `pnpm dev` from the root. The frontend will be available at [http://localhost:9000](http://localhost:5173) and the backend API at [http://localhost:5000](http://localhost:5000).
2. Use the Patient List page to browse patients and click to view details.

## Troubleshooting

- Make sure you are using the correct Node.js and pnpm versions.
- If you encounter issues, try running `pnpm install` again.

## License

MIT © [CodeRigged](https://github.com/CodeRigged)
