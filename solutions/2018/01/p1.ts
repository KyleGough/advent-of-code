import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day01p1 = (input: string) => {
  return input
    .split('\n')
    .map((i) => parseInt(i))
    .reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day01p1(input)); // 472
