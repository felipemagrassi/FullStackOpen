import { v4 as uuid } from "uuid";
import patientsData from "../../data/patients";
import { newPatient, Patients, PatientsWithoutSSN } from "../types/types";

const getPatients = (): Array<Patients> => {
  return patientsData;
};

const getPatientsWithoutSSN = (): Array<PatientsWithoutSSN> => {
  const patients = patientsData.map(({ ssn, ...patientsData }) => patientsData);
  return patients;
};

const addEntry = (dataObj: newPatient): Patients => {
  const patient = {
    id: uuid(),
    ...dataObj,
  };

  patientsData.push(patient);
  return patient;
};

export default {
  getPatients,
  getPatientsWithoutSSN,
  addEntry,
};
