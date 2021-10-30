import diagnosesData from "../../data/diagnoses";
import { Diagnoses } from "../types/types";

const getDiagnoses = (): Array<Diagnoses> => {
  return diagnosesData;
};

const addEntry = () => {
  return null;
};

export default {
  getDiagnoses,
  addEntry,
};
