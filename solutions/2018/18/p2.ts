import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Acre, countAcres, simulateMinute } from './day18.helper';

export const day18p2 = (input: string) => {
  let grid = input.split('\n').map((r) => r.split(''));
  const pastGrids: Record<string, number> = {};

  let repeatFound = false;
  let minutes = 0;

  while (!repeatFound) {
    grid = simulateMinute(grid);
    minutes += 1;
    const gridString = printGrid(grid);

    if (pastGrids[gridString]) {
      const periodicity = minutes - pastGrids[gridString];
      const remainingMins = 1_000_000_000 - minutes;
      const periods = Math.floor(remainingMins / periodicity);
      const remainderMins = remainingMins - periodicity * periods;
      for (let k = 0; k < remainderMins; k++) {
        grid = simulateMinute(grid);
      }
      repeatFound = true;
    }

    pastGrids[gridString] = minutes;
  }

  const treeCount = countAcres(grid, Acre.TREE);
  const lumberCount = countAcres(grid, Acre.LUMBER);
  return treeCount * lumberCount;
};

const printGrid = (grid: string[][]) => {
  return grid.map((r) => r.join('')).join('\n');
};

const input = getPuzzle(__dirname).input;
run(() => day18p2(input)); // 169234
