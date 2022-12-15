import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day01p2 = (input: string) => {
  const items = input.split('\n\n');

  const calorieList = items.map((item: string) =>
    item
      .split('\n')
      .map((carlorie) => parseInt(carlorie))
      .reduce((prev, curr) => prev + curr, 0)
  );

  const [c1, c2, c3] = calorieList.sort((a, b) => b - a).splice(0, 3);

  return c1 + c2 + c3;
};

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 206643
