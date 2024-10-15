import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { countPixels, enhanceGrid } from './day20.helper';

export const day20p1 = (input: string) => {
  const sections = input.split('\n\n');
  const enhancements = sections[0];
  const grid = sections[1].split('\n').map((row) => row.split(''));
  const enhancedGrid = enhanceGrid(grid, enhancements, 2);
  return countPixels(enhancedGrid);
};

const input = getPuzzle(__dirname).input;
run(() => day20p1(input)); // 5081
