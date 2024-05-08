const getErosionLevels = (
  x: number,
  y: number,
  depth: number,
  tx: number,
  ty: number,
  grid: number[][]
): number => {
  return (getGeologicIndex(x, y, depth, tx, ty, grid) + depth) % 20183;
};

const getGeologicIndex = (
  x: number,
  y: number,
  depth: number,
  tx: number,
  ty: number,
  grid: number[][]
): number => {
  if (x === 0 && y === 0) return 0;
  if (x === tx && y === ty) return 0;
  if (y === 0) return x * 16807;
  if (x === 0) return y * 48271;

  let leftLevel = 0;
  let upLevel = 0;

  const leftGridLevel = grid[y][x - 1];
  if (leftGridLevel >= 0) {
    leftLevel = leftGridLevel;
  } else {
    leftLevel = getErosionLevels(x - 1, y, depth, tx, ty, grid);
  }

  const upGridLevel = grid[y - 1][x];
  if (upGridLevel >= 0) {
    upLevel = upGridLevel;
  } else {
    upLevel = getErosionLevels(x, y - 1, depth, tx, ty, grid);
  }

  return leftLevel * upLevel;
};

const getRisk = (erosionLevel: number): number => {
  return erosionLevel % 3;
};

export const getCave = (
  depth: number,
  tx: number,
  ty: number,
  buffer = 0
): number[][] => {
  const cave: number[][] = [];
  for (let y = 0; y <= ty + buffer; y++) {
    const row = [];
    for (let x = 0; x <= tx + buffer; x++) {
      row.push(-1);
    }
    cave.push(row);
  }

  cave[0][0] = 0;
  cave[ty][tx] = 0;

  for (let y = 0; y <= ty + buffer; y++) {
    for (let x = 0; x <= tx + buffer; x++) {
      cave[y][x] = getErosionLevels(x, y, depth, tx, ty, cave);
    }
  }

  return cave.map((r) => r.map(getRisk));
};
