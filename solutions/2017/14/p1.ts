import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { sum } from '@utilities/reduce';
import { hashGrid } from './day14.helper';

const countOnes = (list: string[]): number =>
  list.filter((i) => i === '1').length;

export const day14p1 = (input: string) => {
  const grid = hashGrid(input);
  return grid.map(countOnes).reduce(sum, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day14p1(input)); // 8222
