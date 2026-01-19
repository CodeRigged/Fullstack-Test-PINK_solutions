# Fullstack App Monorepo

This project is a fullstack example using a [pnpm](https://pnpm.io/) workspace. It contains both frontend and backend packages managed together.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20.19.0 or higher recommended)
- [pnpm](https://pnpm.io/) (v10.28 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (required for backend; can be run locally or via Docker)

To install pnpm globally, run:

```bash
npm install -g pnpm
```

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/CodeRigged/fullstack-app-template.git
   cd ./fullstack-app-template
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

## Project Structure

- `frontend/` – React TypeScript frontend app
- `backend/` – Backend service (Express + MongoDB, with controllers/models/routes/services)
- `shared/` – Shared TypeScript code (types, enums, utilities) for both frontend and backend

## Troubleshooting

- Make sure you are using the correct Node.js and pnpm versions.
- If you encounter issues, try running `pnpm install` again.
- If the backend fails to connect to MongoDB, ensure MongoDB is running locally (default: mongodb://localhost:27017/todos) or update the `MONGO_URI` environment variable.

## License

MIT © [CodeRigged](https://github.com/CodeRigged)
