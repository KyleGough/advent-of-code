import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customConfig } from './customConfig';
import { Grid, animate, lightCount } from './day18.helper';

const toggleOnCornerLights = (grid: Grid) => {
  const size = grid.length;
  grid[0][0] = true;
  grid[0][size - 1] = true;
  grid[size - 1][0] = true;
  grid[size - 1][size - 1] = true;
};

export const day18p2 = (input: string, steps: number) => {
  let grid = input
    .split('\n')
    .map((row) => row.split('').map((cell) => cell === '#'));
  toggleOnCornerLights(grid);

  for (let i = 0; i < steps; i++) {
    grid = animate(grid);
    toggleOnCornerLights(grid);
  }

  return lightCount(grid);
};

const input = getPuzzleWithConfig(__dirname, customConfig).input;
run(() => day18p2(...input)); // 924
