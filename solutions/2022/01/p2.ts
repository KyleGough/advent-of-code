import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day01p2 = (input: string) => {
  return input
    .split('\n\n')
    .map((item: string) =>
      item
        .split('\n')
        .map((carlorie) => parseInt(carlorie))
        .reduce(sum)
    )
    .sort((a, b) => b - a)
    .splice(0, 3)
    .reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 206643
