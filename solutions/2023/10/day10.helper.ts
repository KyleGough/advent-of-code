export type Grid = string[][];

export const findStartPipe = (grid: Grid): [number, number, string] => {
  const width = grid[0].length;
  const height = grid.length;
  let startX = 0;
  let startY = 0;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (grid[y][x] === 'S') {
        startX = x;
        startY = y;
      }
    }
  }

  let north, east, south, west;

  // Check north direction.
  if (startY > 0) {
    const northPipe = grid[startY - 1][startX];
    if (['|', '7', 'F'].includes(northPipe)) {
      north = true;
    }
  }

  // Check east direction.
  if (startX + 1 < width) {
    const eastPipe = grid[startY][startX + 1];
    if (['-', 'J', '7'].includes(eastPipe)) {
      east = true;
    }
  }

  // Check south direction.
  if (startY + 1 < height) {
    const southPipe = grid[startY + 1][startX];
    if (['|', 'L', 'J'].includes(southPipe)) {
      south = true;
    }
  }

  // Check west direction.
  if (startX > 0) {
    const westPipe = grid[startY][startX - 1];
    if (['-', 'L', 'F'].includes(westPipe)) {
      west = true;
    }
  }

  let startPipe;

  switch (true) {
    case north && south:
      startPipe = '|';
      break;
    case east && west:
      startPipe = '-';
      break;
    case north && east:
      startPipe = 'L';
      break;
    case north && west:
      startPipe = 'J';
      break;
    case south && west:
      startPipe = '7';
      break;
    default:
      startPipe = 'F';
      break;
  }

  grid[startY][startX] = startPipe;

  return [startX, startY, startPipe];
};

export const startDirection = (startPipe: string): string => {
  switch (startPipe) {
    case '-':
    case 'L':
    case 'F':
      return 'E';
    case '|':
    case 'J':
      return 'N';
    default:
      return 'S';
  }
};

export const nextDirection = (pipe: string, direction: string): string => {
  switch (pipe) {
    case '|':
      return direction === 'N' ? 'N' : 'S';
    case '-':
      return direction === 'E' ? 'E' : 'W';
    case 'L':
      return direction === 'S' ? 'E' : 'N';
    case 'J':
      return direction === 'S' ? 'W' : 'N';
    case '7':
      return direction === 'N' ? 'W' : 'S';
    default:
      return direction === 'N' ? 'E' : 'S';
  }
};
