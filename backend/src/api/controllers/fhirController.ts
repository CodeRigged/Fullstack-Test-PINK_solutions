import { Request, Response } from "express";
import fhirtClient from "fhirclient";
import { FhirBundle, FhirPatient } from "shared/types";

declare module "express-session" {
  interface SessionData {
    SMART_KEY?: any;
  }
}

export const startFhirClient = async (req: Request, res: Response) => {
  try {
    fhirtClient(req, res).authorize({
      iss: process.env.FHIR_CLIENT_URI,
      redirectUri: process.env.FHIR_REDIRECT_URI,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to connect to FHIR client" });
  }
};

// Stop FHIR client: destroy session and respond
export const stopFhirClient = (req: Request, res: Response) => {
  req.session?.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to stop FHIR client" });
    }
    res.json({ message: "FHIR client stopped" });
  });
};

export const getPatients = async (req: Request, res: Response) => {
  try {
    const client = await fhirtClient(req, res).ready();
    const patients = (await client.request("Patient")) as FhirBundle;
    res.json(patients);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to get patients" });
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  const patientId = req.params.id;
  try {
    const client = await fhirtClient(req, res).ready();
    const patient = (await client.request(
      `Patient/${patientId}`,
    )) as FhirPatient;
    res.json(patient);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to get patient by ID" });
  }
};

export const checkSession = (req: Request, res: Response) => {
  if (req.session && req.session.SMART_KEY) {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
};
