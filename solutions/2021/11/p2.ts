import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { performStep } from './day11.helper';

export const day11p2 = (input: string) => {
  const grid = input.split('\n').map((row) => row.split('').map(Number));
  let flashes = 0;
  let steps = 0;

  while (flashes !== 100) {
    flashes = performStep(grid);
    steps += 1;
  }

  return steps;
};

const input = getPuzzle(__dirname).input;
run(() => day11p2(input)); // 387
