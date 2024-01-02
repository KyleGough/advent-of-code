import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day21p1 = (input: string) => {
  const grid = input.split('\n').map((i) => i.split(''));
  const width = grid[0].length;
  const height = grid.length;
  let queue: number[][] = [findStart(grid)];
  const steps = 64;

  for (let i = 0; i < steps; i++) {
    const frontiers = new Set<string>();

    while (queue.length) {
      const [x, y] = queue.pop() as [number, number];

      // West adjacent.
      if (x > 0 && grid[y][x - 1] !== '#') {
        frontiers.add(coordToString(x - 1, y));
      }

      // North adjacent.
      if (y > 0 && grid[y - 1][x] !== '#') {
        frontiers.add(coordToString(x, y - 1));
      }

      // East adjacent.
      if (x < width - 1 && grid[y][x + 1] !== '#') {
        frontiers.add(coordToString(x + 1, y));
      }

      // South adjacent.
      if (y < height - 1 && grid[y + 1][x] !== '#') {
        frontiers.add(coordToString(x, y + 1));
      }
    }

    queue = Array.from(frontiers).map(stringToCoord);
  }

  const targets = new Set<string>(queue.map((i) => coordToString(i[0], i[1])));
  return targets.size;
};

const coordToString = (x: number, y: number) => `${x},${y}`;

const stringToCoord = (coord: string): number[] =>
  coord.split(',').map((i) => parseInt(i));

const findStart = (grid: string[][]): [number, number] => {
  const height = grid.length;
  const width = grid[0].length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === 'S') {
        return [x, y];
      }
    }
  }

  return [0, 0];
};

const input = getPuzzle(__dirname).input;
run(() => day21p1(input)); // 3637
