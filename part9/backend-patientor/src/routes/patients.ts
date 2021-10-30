import express from "express";
import patientsService from "../services/patientsService";
import newPatientEntry from "../utils/parsePatient";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getPatientsWithoutSSN();
  return res.json(patients);
});

router.post("/", (req, res) => {
  try {
    const newPatient = newPatientEntry(req.body);

    const patient = patientsService.addEntry(newPatient);
    res.json(patient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

export default router;
