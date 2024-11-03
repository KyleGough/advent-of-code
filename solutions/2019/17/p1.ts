import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { sum } from '@utilities/reduce';
import { getScaffolding } from './day17.helper';

export const day17p1 = (input: string) => {
  const nums = input.split(',').map(Number);
  const scaffolding = getScaffolding(nums);
  const intersections = findIntersections(scaffolding);
  return intersections.map(getAlignment).reduce(sum, 0);
};

interface Coord {
  x: number;
  y: number;
}

const convolutions: Coord[] = [
  { x: 0, y: 0 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

const isIntersection = (grid: string[][], x: number, y: number): boolean => {
  for (const { x: dx, y: dy } of convolutions) {
    if (grid[y + dy][x + dx] !== '#') {
      return false;
    }
  }

  return true;
};

const findIntersections = (scaffolding: string) => {
  const grid = scaffolding.split('\n').map((row) => row.split(''));
  const intersections: Coord[] = [];
  const height = grid.length;
  const width = grid[0].length;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (isIntersection(grid, x, y)) {
        intersections.push({ x, y });
      }
    }
  }

  return intersections;
};

const getAlignment = (intersection: Coord): number => {
  return intersection.x * intersection.y;
};

const input = getPuzzle(__dirname).input;
run(() => day17p1(input)); // 6000
