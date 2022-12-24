import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  parseHorizontal,
  parseVertical,
  getTargetCoords,
  pathTime,
} from './day24.helper';

export const day24p1 = (input: string) => {
  const grid = input.split('\n').map((row) => row.split(''));
  const hGrids = parseHorizontal(grid);
  const vGrids = parseVertical(grid);

  // Grid dimensions.
  const width = grid[0].length;
  const height = grid.length;

  // Start and end coordinates.
  const [startX, startY] = getTargetCoords(grid, 0);
  const [endX, endY] = getTargetCoords(grid, grid.length - 1);

  const staticData = { hGrids, vGrids, width, height };

  return pathTime(startX, startY, -1, endX, endY, staticData);
};

const input = getPuzzle(__dirname).input;
run(() => day24p1(input)); // 283
