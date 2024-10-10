import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { performStep } from './day11.helper';

export const day11p1 = (input: string) => {
  const grid = input.split('\n').map((row) => row.split('').map(Number));
  let flashes = 0;

  for (let step = 0; step < 100; step++) {
    flashes += performStep(grid);
  }

  return flashes;
};

const input = getPuzzle(__dirname).input;
run(() => day11p1(input)); // 1571
