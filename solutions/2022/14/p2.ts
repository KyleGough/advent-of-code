import { getPuzzle } from '@utilities/getPuzzle';
import { Cell, getRockPositions, getMaxDepth } from './day14.helper';
import { run } from '@utilities/run';

const cellToStr = (position: Cell): string => `${position[0]},${position[1]}`;

export const day14p2 = (input: string) => {
  const rockPaths = input.split('\n').map((i) => i.split(' -> '));
  const rockCells = rockPaths.map(getRockPositions).flat();
  const rocks = new Set<string>(rockCells.map(cellToStr));
  const maxDepth = getMaxDepth(rockCells);
  const floorDepth = maxDepth + 2;
  const sand = new Set<string>();

  const isAir = (position: Cell): boolean => {
    return !rocks.has(cellToStr(position)) && !sand.has(cellToStr(position));
  };

  let sandFilled = false;
  let [sandX, sandY] = [500, 0];

  while (!sandFilled) {
    if (sandY >= floorDepth - 1) {
      sand.add(cellToStr([sandX, sandY]));
      sandX = 500;
      sandY = 0;
    } else if (isAir([sandX, sandY + 1])) {
      // Directly below.
      sandY++;
      // Below-left.
    } else if (isAir([sandX - 1, sandY + 1])) {
      sandX--;
      sandY++;
    } else if (isAir([sandX + 1, sandY + 1])) {
      // Below right.
      sandX++;
      sandY++;
    } else {
      sand.add(cellToStr([sandX, sandY]));

      if (sandX === 500 && sandY === 0) {
        sandFilled = true;
      }

      sandX = 500;
      sandY = 0;
    }
  }

  return sand.size;
};

const input = getPuzzle(__dirname).input;
run(() => day14p2(input)); // 25161
