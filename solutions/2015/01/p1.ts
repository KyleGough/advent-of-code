import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day01p1 = (input: string) => {
  return input
    .split('')
    .reduce((prev, curr) => (curr === '(' ? prev + 1 : prev - 1), 0);
};

const input = getPuzzle(__dirname).input;
run(() => day01p1(input)); // 232
