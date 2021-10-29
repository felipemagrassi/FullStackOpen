interface BMI {
  height: number;
  weight: number;
}
const parseArguments = (args: Array<string>): BMI => {
  if (args.length !== 4) {
    throw new Error("invalid number of arguments");
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

const calculateBMI = (dataObj: BMI): string => {
  const { height, weight } = dataObj;
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided valueus were not numbers");
  }
  const heightInM = height / 100;
  const bmi = Math.floor(weight / (heightInM * heightInM));
  console.log(bmi);
  if (bmi < 16) return "Underweight (Severe thinness)";
  else if (bmi >= 16 && bmi <= 16.9) return "Underweight (moderate thinness)";
  else if (bmi >= 17 && bmi <= 18.4) return "Underweight (Mild thinness)";
  else if (bmi >= 18.5 && bmi <= 24.9) return "Normal (healthy range)";
  else if (bmi >= 25 && bmi <= 29.9) return "Overweight";
  else if (bmi >= 30 && bmi <= 34.9) return "Obese (Class 1)";
  else if (bmi >= 35 && bmi <= 39.9) return "Obese (Class 2)";
  else return "Obese (Class 3)";
};

console.log(calculateBMI(parseArguments(process.argv)));
