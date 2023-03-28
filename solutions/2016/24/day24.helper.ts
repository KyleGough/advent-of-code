type Locations = [number, number][];
type Grid = boolean[][];
type Maze = [Grid, Locations];

export const parseMaze = (input: string): Maze => {
  const inputRows = input.split('\n');
  const grid: Grid = [];
  const locations: Locations = [];
  let startX = 0;
  let startY = 0;

  for (let i = 0; i < inputRows.length; i++) {
    const inputRow = inputRows[i].split('');
    const gridRow = [];
    for (let j = 0; j < inputRow.length; j++) {
      switch (inputRow[j]) {
        case '#':
          gridRow.push(false);
          break;
        case '.':
          gridRow.push(true);
          break;
        case '0':
          startX = j;
          startY = i;
          gridRow.push(true);
          break;
        default:
          locations.push([j, i]);
          gridRow.push(true);
          break;
      }
    }

    grid.push(gridRow);
  }

  locations.unshift([startX, startY]);

  return [grid, locations];
};

export const getDistance = (
  start: [number, number],
  grid: Grid,
  locations: Locations
) => {
  const distances: number[] = Array(locations.length).fill(Number.MAX_VALUE);
  const stack = [[...start, 0]];
  const visited = new Set<string>();
  const width = grid[0].length;
  const height = grid.length;

  while (stack.length) {
    const [x, y, dist] = stack.shift() as number[];

    // Check grid cell has not been visited.
    if (visited.has(`${x},${y}`)) {
      continue;
    }

    visited.add(`${x},${y}`);

    // Update distances if POI location.
    for (let i = 0; i < locations.length; i++) {
      if (
        x === locations[i][0] &&
        y === locations[i][1] &&
        dist < distances[i]
      ) {
        distances[i] = dist;
      }
    }

    if (x - 1 >= 0 && grid[y][x - 1]) {
      stack.push([x - 1, y, dist + 1]);
    }
    if (x + 1 < width && grid[y][x + 1]) {
      stack.push([x + 1, y, dist + 1]);
    }
    if (y - 1 >= 0 && grid[y - 1][x]) {
      stack.push([x, y - 1, dist + 1]);
    }
    if (y + 1 < height && grid[y + 1][x]) {
      stack.push([x, y + 1, dist + 1]);
    }
  }

  return distances;
};

export const getAdjacencyMatrix = (
  grid: Grid,
  locations: Locations
): number[][] => {
  const matrix = Array(locations.length);

  for (let i = 0; i < locations.length; i++) {
    matrix[i] = getDistance(locations[i], grid, locations);
  }

  return matrix;
};

export const getTotalDist = (order: number[], matrix: number[][]): number => {
  let dist = 0;
  for (let i = 0; i < order.length - 1; i++) {
    dist += matrix[order[i]][order[i + 1]];
  }
  return dist;
};
