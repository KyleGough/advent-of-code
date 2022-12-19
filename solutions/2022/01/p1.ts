import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day01p1 = (input: string) => {
  const items = input.split('\n\n');

  const calorieList = items.map((item: string) =>
    item
      .split('\n')
      .map((calorie) => parseInt(calorie))
      .reduce(sum)
  );

  return calorieList.sort((a, b) => b - a)[0];
};

const input = getPuzzle(__dirname).input;
run(() => day01p1(input)); // 70698
