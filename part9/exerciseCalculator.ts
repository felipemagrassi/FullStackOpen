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

function calculateExercises(dataObj: userInput): Exercises {
  const { weekDays, target } = dataObj;
  const periodLength = weekDays.length;
  const trainingDays = weekDays.filter((a) => a !== 0).length;
  const average =
    weekDays.reduce((prevValue, currentValue) => prevValue + currentValue, 0) /
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
}

export default calculateExercises;
