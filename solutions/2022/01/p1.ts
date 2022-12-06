import { getPuzzleInput } from '@utilities/getPuzzleInput';

export const day01p1 = (input: string) => {
  const items = input.split('\n\n');

  const calorieList = items.map((item: string) =>
    item
      .split('\n')
      .map((calorie) => parseInt(calorie))
      .reduce((prev, curr) => prev + curr, 0)
  );

  return calorieList.sort((a, b) => b - a)[0];
};

const input = getPuzzleInput(__dirname).input;
console.log(day01p1(input)); // 70698
