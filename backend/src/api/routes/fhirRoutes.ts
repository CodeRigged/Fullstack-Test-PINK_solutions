import { Router } from "express";
import * as fhirController from "../controllers/fhirController";

const router = Router();

// start FHIR client (login)
router.get("/start", fhirController.startFhirClient);

// check session
router.get("/check-session", fhirController.checkSession);

// stop FHIR client (logout)
router.post("/stop", fhirController.stopFhirClient);

// get patients list
router.get("/patients", fhirController.getPatients);

// get patient by ID
router.get("/patients/:id", fhirController.getPatientById);

export default router;
