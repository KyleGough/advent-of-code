import { getPuzzle } from '@utilities/getPuzzle';
import { Cell, getRockPositions, getMaxDepth } from './day14.helper';

export const day14p1 = (input: string) => {
  const rockPaths = input.split('\n').map((i) => i.split(' -> '));
  const rocks = [...new Set<Cell>(rockPaths.map(getRockPositions).flat())];
  const maxDepth = getMaxDepth(rocks);

  const isAir = (position: Cell): boolean => {
    for (let i = 0; i < rocks.length; i++) {
      if (position[0] === rocks[i][0] && position[1] === rocks[i][1]) {
        return false;
      }
    }

    return true;
  };

  let sandCount = 0;

  let [sandX, sandY] = [500, 0];

  while (sandY <= maxDepth) {
    if (isAir([sandX, sandY + 1])) {
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
      sandCount++;
      rocks.push([sandX, sandY]);
      sandX = 500;
      sandY = 0;
    }
  }

  return sandCount;
};

const input = getPuzzle(__dirname).input;
console.log(day14p1(input)); // 805
