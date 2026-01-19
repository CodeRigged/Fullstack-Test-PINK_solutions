import { Request, Response } from "express";
import fhirtClient from "fhirclient";

export const startFhirClient = async (req: Request, res: Response) => {
  try {
    fhirtClient(req, res).authorize({
      iss: process.env.FHIR_CLIENT_URI,
      redirectUri: "/fhir/patients",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to connect to FHIR client" });
  }
};

export const getPatients = async (req: Request, res: Response) => {
  try {
    const client = await fhirtClient(req, res).ready();
    const patients = await client.request("Patient");
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to get patients" });
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  const patientId = req.params.id;
  try {
    const client = await fhirtClient(req, res).ready();
    const patient = await client.request(`Patient/${patientId}`);
    res.json(patient);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to get patient by ID" });
  }
};
