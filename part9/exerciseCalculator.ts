interface Exercises {
  periodLength: number;
  trainingDays: number;
  sucess: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface userInput {
  weekDays: Array<number>;
  target: number;
}

const parseArgument = (args: Array<string>): userInput => {
  let weekDays: Array<number> = [];
  let target: number;

  for (let i = 1; i < args.length - 2; i++) {
    console.log("args: ", i, args[i + 2]);
    if (isNaN(Number(args[i + 2]))) {
      throw new Error("Provided values were not numbers");
    } else {
      weekDays.push(Number(args[i + 2]));
    }
  }
  target = Number(args[2]);
  return { weekDays, target };
};

const calculateExercises = (dataObj: userInput): Exercises => {
  const { weekDays, target } = dataObj;
  const periodLength = weekDays.length;
  const trainingDays = weekDays.filter((a) => a !== 0).length;
  const average =
    weekDays.reduce((prevValue, currentValue) => prevValue + currentValue) /
    periodLength;
  const rating = 2;
  const sucess = average >= rating ? true : false;
  const ratingDescription =
    average > rating ? "great" : average < rating ? "could be better" : "okay";

  return {
    periodLength,
    trainingDays,
    sucess,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises(parseArgument(process.argv)));
