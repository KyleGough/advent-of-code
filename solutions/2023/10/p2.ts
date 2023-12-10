import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  findStartPipe,
  Grid,
  nextDirection,
  startDirection,
} from './day10.helper';

export const day10p2 = (input: string) => {
  const grid = input.split('\n').map((i) => i.split(''));
  const [startX, startY, pipe] = findStartPipe(grid);
  const loopPipes = traverseLoop(grid, startX, startY, pipe);

  const width = grid[0].length;
  const height = grid.length;
  let insideCount = 0;

  // Odd-Even rule, using a ray casting north-west, ignoring 'L' and '7' pipes.
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (loopPipes.has(`${x},${y}`)) {
        continue;
      }

      let pipeCount = 0;
      let testX = x - 1;
      let testY = y - 1;

      while (testX > 0 || testY > 0) {
        if (
          loopPipes.has(`${testX},${testY}`) &&
          grid[testY][testX] !== 'L' &&
          grid[testY][testX] !== '7'
        ) {
          pipeCount++;
        }

        testX--;
        testY--;
      }

      if (pipeCount % 2 === 1) {
        insideCount++;
      }
    }
  }

  return insideCount;
};

const traverseLoop = (
  grid: Grid,
  startX: number,
  startY: number,
  startPipe: string
): Set<string> => {
  let x = startX;
  let y = startY;
  let direction = startDirection(startPipe);
  const loopPipes = new Set<string>();

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

    // Update direction
    direction = nextDirection(grid[y][x], direction);

    // Add pipes to set
    loopPipes.add(`${x},${y}`);
  } while (x !== startX || y !== startY);

  return loopPipes;
};

const input = getPuzzle(__dirname).input;
run(() => day10p2(input)); // 381
