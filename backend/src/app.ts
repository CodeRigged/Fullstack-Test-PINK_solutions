import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import fhirRoutes from "./api/routes/fhirRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", async (_req, res) => {
  res.json({ status: "ok" });
});

// fhir API
app.use("/fhir", fhirRoutes);

// Connect to server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
