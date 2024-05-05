import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Acre, countAcres, simulateMinute } from './day18.helper';

export const day18p1 = (input: string) => {
  let grid = input.split('\n').map((r) => r.split(''));

  for (let i = 0; i < 10; i++) {
    grid = simulateMinute(grid);
  }

  const treeCount = countAcres(grid, Acre.TREE);
  const lumberCount = countAcres(grid, Acre.LUMBER);
  return treeCount * lumberCount;
};

const input = getPuzzle(__dirname).input;
run(() => day18p1(input)); // 620624
