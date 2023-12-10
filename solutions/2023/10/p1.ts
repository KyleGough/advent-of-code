import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  findStartPipe,
  Grid,
  nextDirection,
  startDirection,
} from './day10.helper';

export const day10p1 = (input: string) => {
  const grid = input.split('\n').map((i) => i.split(''));
  const [x, y, pipe] = findStartPipe(grid);
  const length = traverseLoop(grid, x, y, pipe);
  return length / 2;
};

const traverseLoop = (
  grid: Grid,
  startX: number,
  startY: number,
  startPipe: string
): number => {
  let x = startX;
  let y = startY;
  let direction = startDirection(startPipe);
  let count = 0;

  do {
    // Move
    switch (direction) {
      case 'N':
        y--;
        break;
      case 'E':
        x++;
        break;
      case 'S':
        y++;
        break;
      case 'W':
        x--;
        break;
    }

    count++;

    // Update direction
    direction = nextDirection(grid[y][x], direction);
  } while (x !== startX || y !== startY);

  return count;
};

const input = getPuzzle(__dirname).input;
run(() => day10p1(input)); // 6717
