import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { fill, getStartCoords } from './day21.helper';
import { sum } from '@utilities/reduce';

export const day21p2 = (input: string) => {
  const grid = input.split('\n').map((i) => i.split(''));
  const start = getStartCoords(grid);
  const stepGoal = 26_501_365;

  const size = grid[0].length;
  const gridSpans = Math.floor(stepGoal / size) - 1;

  let totalCount = 0;

  // Fullly reachable grids.
  const oddGrids = (Math.floor(gridSpans / 2) * 2 + 1) ** 2;
  const evenGrids = (Math.ceil((gridSpans + 1) / 2) * 2) ** 2;
  const oddPoints = fill(grid, start, size * 2 + 1);
  const evenPoints = fill(grid, start, size * 2);

  totalCount += oddGrids * oddPoints;
  totalCount += evenGrids * evenPoints;

  // Axis directions.
  const axisStarts: [number, number][] = [
    [start[0], size - 1],
    [0, start[1]],
    [start[0], 0],
    [size - 1, start[1]],
  ];

  totalCount += fillAll(grid, axisStarts, size - 1);

  const segmentStarts: [number, number][] = [
    [size - 1, 0],
    [size - 1, size - 1],
    [0, 0],
    [0, size - 1],
  ];

  // Small segment grids.
  const smallCount = fillAll(grid, segmentStarts, Math.floor(size / 2) - 1);
  totalCount += (gridSpans + 1) * smallCount;

  // Large segment grids.
  const largeCount = fillAll(
    grid,
    segmentStarts,
    Math.floor((size * 3) / 2) - 1
  );
  totalCount += gridSpans * largeCount;

  return totalCount;
};

const fillAll = (
  grid: string[][],
  starts: [number, number][],
  steps: number
): number => {
  return starts.map((s) => fill(grid, s, steps)).reduce(sum, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day21p2(input)); // 601113643448699
