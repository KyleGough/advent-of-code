import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getTotalLoad, tiltNorth } from './day14.helper';

export const day14p1 = (input: string) => {
  const grid = input.split('\n').map((i) => i.split(''));
  const tiltedGrid = tiltNorth(grid);
  return getTotalLoad(tiltedGrid);
};

const input = getPuzzle(__dirname).input;
run(() => day14p1(input)); // 105461
