import { Router } from "express";
import * as fhirController from "../controllers/fhirController";

const router = Router();

// fhir routes
router.get("/start", fhirController.startFhirClient);
router.get("/patients", fhirController.getPatients);
router.get("/patients/:id", fhirController.getPatientById);

export default router;
