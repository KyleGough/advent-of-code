export const getStartCoords = (grid: string[][]): [number, number] => {
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

const coordToString = (x: number, y: number) => `${x},${y}`;

export const fill = (
  grid: string[][],
  start: [number, number],
  stepGoal: number
): number => {
  const width = grid[0].length;
  const height = grid.length;
  const queue: number[][] = [[...start, stepGoal]];
  const reach = new Set<string>();
  const seen = new Set<string>();

  while (queue.length) {
    const [x, y, steps] = queue.shift() as number[];
    const coord = coordToString(x, y);

    if (seen.has(coord)) {
      continue;
    }

    if (steps % 2 === 0) {
      reach.add(coord);
    }

    if (steps === 0) {
      continue;
    }

    seen.add(coord);

    // West adjacent.
    if (x > 0 && grid[y][x - 1] !== '#') {
      queue.push([x - 1, y, steps - 1]);
    }

    // North adjacent.
    if (y > 0 && grid[y - 1][x] !== '#') {
      queue.push([x, y - 1, steps - 1]);
    }

    // East adjacent.
    if (x < width - 1 && grid[y][x + 1] !== '#') {
      queue.push([x + 1, y, steps - 1]);
    }

    // South adjacent.
    if (y < height - 1 && grid[y + 1][x] !== '#') {
      queue.push([x, y + 1, steps - 1]);
    }
  }

  return reach.size;
};
