import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customConfig } from './customConfig';
import { fill, getStartCoords } from './day21.helper';

export const day21p1 = (input: string, stepGoal: number) => {
  const grid = input.split('\n').map((i) => i.split(''));
  const start = getStartCoords(grid);
  return fill(grid, start, stepGoal);
};

const input = getPuzzleWithConfig(__dirname, customConfig).input;
run(() => day21p1(...input)); // 3637
