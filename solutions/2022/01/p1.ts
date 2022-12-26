import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day01p1 = (input: string) =>
  input
    .split('\n\n')
    .map((group: string) =>
      group
        .split('\n')
        .map((calorie) => parseInt(calorie))
        .reduce(sum)
    )
    .sort((a, b) => b - a)[0];

const input = getPuzzle(__dirname).input;
run(() => day01p1(input)); // 70698
