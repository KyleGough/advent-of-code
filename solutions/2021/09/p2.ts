import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { adjacentCoords, isMinimum } from './day09.helper';
import { product } from '@utilities/reduce';

export const day09p2 = (input: string) => {
  const grid = input.split('\n').map((row) => row.split('').map(Number));
  const minima = getMinima(grid);
  const basinVolumes = minima.map((m) => getBasinVolume(grid, m));
  const maxVolumes = basinVolumes.sort((a, b) => b - a).slice(0, 3);
  return maxVolumes.reduce(product, 1);
};

interface Coord {
  x: number;
  y: number;
}

const getMinima = (grid: number[][]): Coord[] => {
  const width = grid[0].length;
  const height = grid.length;
  const minima: Coord[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isMinimum(grid, x, y)) {
        minima.push({ x, y });
      }
    }
  }

  return minima;
};

const coordToString = (x: number, y: number) => `${x},${y}`;

const getBasinVolume = (grid: number[][], minima: Coord): number => {
  const queue: Coord[] = [minima];
  const visited = new Set<string>();

  while (queue.length) {
    const { x, y } = queue.pop() as Coord;
    const coordString = coordToString(x, y);

    if (visited.has(coordString)) {
      continue;
    }

    visited.add(coordString);

    const value = grid[y][x];

    for (const { dx, dy } of adjacentCoords) {
      const adjacentValue = grid?.[y + dy]?.[x + dx] ?? 9;
      if (adjacentValue > value && adjacentValue < 9) {
        queue.push({ x: x + dx, y: y + dy });
      }
    }
  }

  return visited.size;
};

const input = getPuzzle(__dirname).input;
run(() => day09p2(input)); // 1045660
