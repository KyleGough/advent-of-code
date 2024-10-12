import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { dijkstras, Grid } from './day15.helper';

export const day15p1 = (input: string) => {
  const grid = new Grid(
    input.split('\n').map((row) => row.split('').map(Number))
  );
  return dijkstras(grid);
};

const input = getPuzzle(__dirname).input;
run(() => day15p1(input)); // 458
