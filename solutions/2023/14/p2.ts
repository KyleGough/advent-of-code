import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { transpose } from '@utilities/array';
import { getTotalLoad, tiltNorth } from './day14.helper';

const NUM_SPINS = 1_000_000_000;

export const day14p2 = (input: string) => {
  const gridMap = new Map();
  let grid = input.split('\n').map((i) => i.split(''));

  for (let i = 0; i < NUM_SPINS; i++) {
    grid = spinCycle(grid);

    const gridCode = grid.map((row) => row.join('')).join(',');
    if (gridMap.has(gridCode)) {
      const lastIndex = gridMap.get(gridCode);
      const loopSize = i - lastIndex;
      const loopCount = Math.floor((NUM_SPINS - i) / loopSize);
      i += loopCount * loopSize;
    }

    gridMap.set(gridCode, i);
  }

  return getTotalLoad(grid);
};

const spinCycle = (grid: string[][]): string[][] => {
  const n = tiltNorth(grid);
  const w = transpose(tiltNorth(transpose(n)));
  const s = tiltNorth(w.reverse()).reverse();
  const e = transpose(tiltNorth(transpose(s).reverse()).reverse());
  return e;
};

const input = getPuzzle(__dirname).input;
run(() => day14p2(input)); // 102829
