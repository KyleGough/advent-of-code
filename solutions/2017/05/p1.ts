import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day05p1 = (input: string) => {
  const arr = input.split('\n').map((i) => parseInt(i));
  let i = 0;
  let steps = 0;

  while (i >= 0 && i < arr.length) {
    i += arr[i]++;
    steps++;
  }

  return steps;
};

const input = getPuzzle(__dirname).input;
run(() => day05p1(input)); // 396086
