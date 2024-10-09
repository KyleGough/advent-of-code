import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { isMinimum } from './day09.helper';

export const day09p1 = (input: string) => {
  const grid = input.split('\n').map((row) => row.split('').map(Number));
  const width = grid[0].length;
  const height = grid.length;

  let totalRisk = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isMinimum(grid, x, y)) {
        totalRisk += grid[y][x] + 1;
      }
    }
  }

  return totalRisk;
};

const input = getPuzzle(__dirname).input;
run(() => day09p1(input)); // 480
