import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { isOpen, hashCoord } from './day13.helper';

export const day13p1 = (input: string) => {
  const goalX = 31;
  const goalY = 39;
  const favNum = parseInt(input);
  const queue: number[][] = [[1, 1, 0]];
  const visited = new Set<string>();

  while (queue.length) {
    const [x, y, steps] = queue.pop() as number[];
    visited.add(hashCoord(x, y));

    if (x === goalX && y === goalY) {
      return steps;
    }

    const checkCells = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];

    for (let i = 0; i < checkCells.length; i++) {
      const checkX = checkCells[i][0];
      const checkY = checkCells[i][1];
      const inBounds = checkX >= 0 && checkY >= 0;
      const unvisited = !visited.has(hashCoord(checkX, checkY));
      const open = isOpen(checkX, checkY, favNum);

      if (inBounds && unvisited && open) {
        queue.unshift([checkX, checkY, steps + 1]);
      }
    }
  }

  return;
};

const input = getPuzzle(__dirname).input;
run(() => day13p1(input)); // 86
