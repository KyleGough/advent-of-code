import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getTreesEncountered } from './day03.helper';
import { product } from '@utilities/reduce';

export const day03p2 = (input: string) => {
  const grid = input.split('\n').map((i) => i.split(''));

  const slopes = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];

  return slopes
    .map((s) => getTreesEncountered(grid, s.x, s.y))
    .reduce(product, 1);
};

const input = getPuzzle(__dirname).input;
run(() => day03p2(input)); // 736527114
