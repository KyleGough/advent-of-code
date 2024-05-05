import { max, min, sum } from '@utilities/reduce';

enum Ground {
  CLAY = '#',
  SAND = ' ',
  STILL_WATER = '~',
  WATER = '|',
  SPRING = '|',
}

interface BoundingBox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

type Coord = {
  x: number;
  y: number;
};

export const parseWall = (input: string): BoundingBox => {
  const [staticStr, variableStr] = input.split(', ').map((i) => i.split('='));
  const axis = staticStr[0];
  const staticValue = parseInt(staticStr[1]);
  const [varMin, varMax] = variableStr[1].split('..').map((i) => parseInt(i));

  if (axis === 'x') {
    return {
      minX: staticValue,
      maxX: staticValue,
      minY: varMin,
      maxY: varMax,
    };
  } else {
    return {
      minX: varMin,
      maxX: varMax,
      minY: staticValue,
      maxY: staticValue,
    };
  }
};

export const getBoundingBox = (walls: BoundingBox[]): BoundingBox => {
  const minX = walls.map((w) => w.minX).reduce(min, Number.MAX_SAFE_INTEGER);
  const maxX = walls.map((w) => w.maxX).reduce(max, 0);
  const minY = walls.map((w) => w.minY).reduce(min, Number.MAX_SAFE_INTEGER);
  const maxY = walls.map((w) => w.maxY).reduce(max, 0);

  return {
    minX: minX - 1,
    maxX: maxX + 1,
    minY: minY - 1,
    maxY: maxY + 1,
  };
};

export const createGrid = (
  box: BoundingBox,
  walls: BoundingBox[]
): string[][] => {
  const width = box.maxX - box.minX + 1;
  const height = box.maxY - box.minY;

  // Create empty grid.
  const grid = [];
  for (let y = 0; y < height; y++) {
    grid.push(Array(width).fill(Ground.SAND));
  }

  // Fill grid with walls.
  for (const wall of walls) {
    for (let y = wall.minY - box.minY; y <= wall.maxY - box.minY; y++) {
      for (let x = wall.minX - box.minX; x <= wall.maxX - box.minX; x++) {
        grid[y][x] = Ground.CLAY;
      }
    }
  }

  // Add water spring.
  grid[0][500 - box.minX] = Ground.SPRING;

  return grid;
};

const isWater = (cell: string): boolean => {
  return cell === Ground.WATER || cell === Ground.STILL_WATER;
};

const isStillWater = (cell: string): boolean => {
  return cell === Ground.STILL_WATER;
};

export class Reservoir {
  grid: string[][];
  maxX: number;

  constructor(grid: string[][], maxX: number) {
    this.grid = grid;
    this.maxX = maxX;
  }

  isPorous(x: number, y: number): boolean {
    const cell = this.grid[y][x];
    return cell === Ground.WATER || cell === Ground.SAND;
  }

  scanLeft(x: number, y: number): boolean {
    for (let dx = x; dx >= 0; dx--) {
      if (this.grid[y][dx] === Ground.CLAY) break;
      if (this.isPorous(dx, y + 1)) return false;
    }
    return true;
  }

  scanRight(x: number, y: number): boolean {
    for (let dx = x; dx <= this.maxX; dx++) {
      if (this.grid[y][dx] === Ground.CLAY) break;
      if (this.isPorous(dx, y + 1)) return false;
    }
    return true;
  }

  flowWaterSides(x: number, y: number) {
    const queue: Coord[] = [];

    // Flow water to the sides.
    const left = this.scanLeft(x, y);
    const right = this.scanRight(x, y);

    if (left && right) {
      // Water is blocked both sides, mark as still water.
      this.grid[y][x] = Ground.STILL_WATER;
      queue.unshift({ x, y });
    } else {
      // Flow water left.
      if (this.grid[y][x - 1] === Ground.SAND) {
        this.grid[y][x - 1] = Ground.WATER;
        queue.unshift({ x: x - 1, y });
      }

      // Flow water right.
      if (this.grid[y][x + 1] === Ground.SAND) {
        this.grid[y][x + 1] = Ground.WATER;
        queue.unshift({ x: x + 1, y });
      }
    }

    return queue;
  }

  flowWater(sourceX: number) {
    const queue = [{ x: sourceX, y: 0 }];

    while (queue.length) {
      const { x, y } = queue.pop() as Coord;

      // Boundary checks.
      if (x < 0 || x > this.maxX) continue;
      if (y + 1 >= this.grid.length) continue;

      const cell = this.grid[y][x];
      const below = this.grid[y + 1][x];

      if (cell === Ground.WATER) {
        if (below === Ground.SAND) {
          // Flow water downwards.
          this.grid[y + 1][x] = Ground.WATER;
          queue.unshift({ x, y: y + 1 });
        } else if (below === Ground.STILL_WATER || below === Ground.CLAY) {
          // Flow water left and right.
          queue.unshift(...this.flowWaterSides(x, y));
        }
      }

      if (cell === Ground.STILL_WATER) {
        // Spread still water to the left.
        for (let dx = x; dx >= 0; dx--) {
          if (this.grid[y][dx] === Ground.CLAY) break;
          this.grid[y][dx] = Ground.STILL_WATER;
        }

        // Spread still water to the right.
        for (let dx = x; dx <= this.maxX; dx++) {
          if (this.grid[y][dx] === Ground.CLAY) break;
          this.grid[y][dx] = Ground.STILL_WATER;
        }

        // Re-evaluate flowing water above.
        for (let dx = x; dx >= 0; dx--) {
          if (this.grid[y - 1][dx] === Ground.CLAY) break;
          if (this.grid[y - 1][dx] === Ground.WATER) {
            queue.unshift({ x: dx, y: y - 1 });
          }
        }
        for (let dx = x + 1; dx <= this.maxX; dx++) {
          if (this.grid[y - 1][dx] === Ground.CLAY) break;
          if (this.grid[y - 1][dx] === Ground.WATER) {
            queue.unshift({ x: dx, y: y - 1 });
          }
        }
      }
    }
  }

  /**
   * Counts the number of flowing and still water.
   * Excludes the water spring.
   */
  countWater(): number {
    const waterCounts = this.grid.map((row) => row.filter(isWater).length);
    return waterCounts.reduce(sum, 0) - 1;
  }

  /**
   * Counts the number of still water.
   */
  countStillWater(): number {
    const waterCounts = this.grid.map((row) => row.filter(isStillWater).length);
    return waterCounts.reduce(sum, 0);
  }
}
