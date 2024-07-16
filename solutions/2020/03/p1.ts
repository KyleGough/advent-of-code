import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getTreesEncountered } from './day03.helper';

export const day03p1 = (input: string) => {
  const grid = input.split('\n').map((i) => i.split(''));
  return getTreesEncountered(grid, 3, 1);
};

const input = getPuzzle(__dirname).input;
run(() => day03p1(input)); // 167
