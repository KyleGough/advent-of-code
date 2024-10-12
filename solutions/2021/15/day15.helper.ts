import { PriorityQueue } from '@utilities/priority-queue';

export class Grid {
  protected grid: number[][];

  constructor(grid: number[][]) {
    this.grid = grid;
  }

  get(x: number, y: number): number {
    return this.grid[y][x];
  }

  width(): number {
    return this.grid[0].length;
  }

  height(): number {
    return this.grid.length;
  }
}

interface QueueItem {
  distance: number;
  x: number;
  y: number;
}

export const dijkstras = (grid: Grid): number => {
  const width = grid.width();
  const height = grid.height();
  const distanceMatrix: number[][] = [];

  for (let y = 0; y < height; y++) {
    distanceMatrix.push(Array(width).fill(Number.MAX_SAFE_INTEGER));
  }

  distanceMatrix[0][0] = 0;

  const queue = new PriorityQueue(
    (a: QueueItem, b: QueueItem) => a.distance < b.distance
  );

  queue.push({ x: 0, y: 0, distance: 0 });

  while (!queue.isEmpty()) {
    const { x, y, distance } = queue.pop();

    for (const { dx, dy } of adjacentCoords) {
      if (isWithinBounds(x + dx, y + dy, width, height)) {
        const alt = distance + grid.get(x + dx, y + dy);
        if (alt < distanceMatrix[y + dy][x + dx]) {
          distanceMatrix[y + dy][x + dx] = alt;
          queue.push({ x: x + dx, y: y + dy, distance: alt });
        }
      }
    }
  }

  return distanceMatrix[height - 1][width - 1];
};

const adjacentCoords = [
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
];

const isWithinBounds = (
  x: number,
  y: number,
  width: number,
  height: number
): boolean => {
  return x >= 0 && x < width && y >= 0 && y < height;
};
