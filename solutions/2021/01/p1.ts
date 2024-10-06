import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day01p1 = (input: string) => {
  const depths = input.split('\n').map(Number);
  let increaseCount = 0;

  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) {
      increaseCount += 1;
    }
  }

  return increaseCount;
};

const input = getPuzzle(__dirname).example;
run(() => day01p1(input)); // 1709
