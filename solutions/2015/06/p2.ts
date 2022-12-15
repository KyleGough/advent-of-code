import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day06p2 = (input: string) => {
  const instructions = input.split('\n');
  const size = 1000;

  const grid: number[][] = [];

  // Initialise grid.
  for (let i = 0; i < size; i++) {
    grid.push(Array(size).fill(0));
  }

  for (let i = 0; i < instructions.length; i++) {
    const matches = instructions[i].match(
      /(\d+),(\d+) through (\d+),(\d+)/
    ) as RegExpMatchArray;

    const minX = Math.min(parseInt(matches[1]), parseInt(matches[3]));
    const maxX = Math.max(parseInt(matches[1]), parseInt(matches[3]));
    const minY = Math.min(parseInt(matches[2]), parseInt(matches[4]));
    const maxY = Math.max(parseInt(matches[2]), parseInt(matches[4]));

    for (let j = minX; j <= maxX; j++) {
      for (let k = minY; k <= maxY; k++) {
        if (instructions[i].includes('toggle')) {
          grid[k][j] += 2;
        } else if (instructions[i].includes('turn off')) {
          grid[k][j] = Math.max(0, grid[k][j] - 1);
        } else {
          grid[k][j] += 1;
        }
      }
    }
  }

  return grid
    .map((row) => row.reduce((prev, curr) => prev + curr, 0))
    .reduce((prev, curr) => prev + curr, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day06p2(input)); // 15343601
