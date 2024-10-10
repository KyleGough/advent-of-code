interface Coord {
  x: number;
  y: number;
}

const coordToString = (x: number, y: number) => `${x},${y}`;

const stringToCoord = (str: string): Coord => {
  const nums = str.split(',').map(Number);
  return { x: nums[0], y: nums[1] };
};

const adjacentCoords = [
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: -1 },
  { dx: 1, dy: 1 },
  { dx: 1, dy: -1 },
  { dx: -1, dy: 1 },
];

const isWithinBounds = ({ x, y }: Coord): boolean => {
  return x >= 0 && x < 10 && y >= 0 && y < 10;
};

export const performStep = (grid: number[][]): number => {
  const flashPoints: Coord[] = [];
  const flashes = new Set<string>();

  // Increment each cell and note all flash points.
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      grid[y][x] += 1;
      if (grid[y][x] > 9) {
        flashPoints.push({ x, y });
      }
    }
  }

  while (flashPoints.length) {
    const { x, y } = flashPoints.pop() as Coord;

    const coordString = coordToString(x, y);

    if (flashes.has(coordString)) {
      continue;
    }

    flashes.add(coordToString(x, y));

    const neighbours: Coord[] = adjacentCoords
      .map(({ dx, dy }) => ({
        x: x + dx,
        y: y + dy,
      }))
      .filter(isWithinBounds);

    for (const { x: nx, y: ny } of neighbours) {
      grid[ny][nx] += 1;
      if (grid[ny][nx] > 9) {
        flashPoints.push({ x: nx, y: ny });
      }
    }
  }

  // Reset all flash points to 0.
  for (const { x, y } of Array.from(flashes).map(stringToCoord)) {
    grid[y][x] = 0;
  }

  return flashes.size;
};
