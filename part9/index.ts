import * as express from "express";

import calculateExercises from "./exerciseCalculator";
import calculateBMI from "./bmiCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    return res.json({ error: "malformatted parameters" });
  }
  const dataObj = {
    height: Number(height),
    weight: Number(weight),
  };
  return res.json({ height, weight, bmi: calculateBMI(dataObj) });
});

app.post("/calculate", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.json({ error: "malformatted parameters" });
  }

  const dataObj = {
    weekDays: daily_exercises,
    target,
  };

  return res.json(calculateExercises(dataObj));
});

const PORT = 3001 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
