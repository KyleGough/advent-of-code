import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day05p2 = (input: string) => {
  const arr = input.split('\n').map((i) => parseInt(i));
  let i = 0;
  let steps = 0;

  while (i >= 0 && i < arr.length) {
    const j = arr[i];
    arr[i] += j >= 3 ? -1 : 1;
    i += j;
    steps++;
  }

  return steps;
};

const input = getPuzzle(__dirname).input;
run(() => day05p2(input)); // 28675390
