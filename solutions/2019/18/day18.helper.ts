export interface Coord {
  x: number;
  y: number;
}

interface Path extends Coord {
  distance: number;
}

export interface KeyPath extends Path {
  key: Lowercase<string>;
}

export const compareState = (
  a: { distance: number; keys: string[] },
  b: { distance: number; keys: string[] }
): boolean => {
  if (a.distance < b.distance) {
    return true;
  } else if (b.distance < a.distance) {
    return false;
  } else if (a.keys.length >= b.keys.length) {
    return true;
  } else {
    return false;
  }
};

export const getEntranceAndKeyCount = (grid: string[][]): [number, Coord] => {
  const height = grid.length;
  const width = grid[0].length;
  let entrance = { x: 0, y: 0 };
  let keys = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = grid[y][x];
      if (cell === '@') {
        entrance = { x, y };
      }
      if (isKey(grid[y][x])) {
        keys += 1;
      }
    }
  }

  return [keys, entrance];
};

const isTraversable = (
  grid: string[][],
  keys: string[],
  x: number,
  y: number
): boolean => {
  // Boundary checks.
  if (x < 0 || x > grid[0].length - 1 || y < 0 || y > grid.length) return false;

  const cell = grid[y][x];

  // Cannot traverse wall.
  if (cell === '#') return false;

  // Open passageway is traversable.
  if (cell === '.') return true;

  // Cell is a key.
  if (isKey(cell)) {
    return true;
  }

  // Doors are only traversable with the corresponding key.
  if (isDoor(cell)) {
    return keys.includes(cell.toLowerCase());
  }

  throw new Error('Unknown cell type');
};

const isKey = (cell: string): cell is Lowercase<string> =>
  !['@', '.', '#'].includes(cell) && cell.toLowerCase() === cell;

const isDoor = (cell: string): cell is Uppercase<string> =>
  !['@', '.', '#'].includes(cell) && cell.toUpperCase() === cell;

const neighbours: Coord[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

// Use BFS to find shortest path to available keys.
export const getPaths = (
  grid: string[][],
  keys: string[],
  pos: Coord
): KeyPath[] => {
  let queue: Path[] = [{ ...pos, distance: 0 }];
  const visited = new Set<string>();
  const paths: KeyPath[] = [];

  while (queue.length) {
    const nextQueue: Path[] = [];
    for (const { x, y, distance } of queue) {
      visited.add(`${x},${y}`);

      const cell = grid[y][x];

      // If detected a new key, pickup and end pathing.
      if (isKey(cell) && !keys.includes(cell)) {
        paths.push({ key: cell, x, y, distance });
        continue;
      }

      for (const neighbour of neighbours) {
        const nx = x + neighbour.x;
        const ny = y + neighbour.y;
        if (!visited.has(`${nx},${ny}`) && isTraversable(grid, keys, nx, ny)) {
          nextQueue.push({ x: nx, y: ny, distance: distance + 1 });
        }
      }
    }

    queue = nextQueue;
  }

  return paths;
};
