import { Gender, newPatient } from "../types/types";

const newPatientEntry = (object: any): newPatient => {
  const patient: newPatient = {
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    ssn: parseString(object.ssn),
    name: parseString(object.name),
    occupation: parseString(object.occupation),
  };

  return patient;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("incorrect text");
  }
  return text;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !Boolean(Date.parse(date))) {
    throw new Error("incorrect or missing date");
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("incorrect or missing gender");
  }

  return gender;
};

export default newPatientEntry;
