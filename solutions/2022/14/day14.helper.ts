export type Cell = number[];

export const getMaxDepth = (rocks: Cell[]): number => {
  let maxDepth = 0;

  for (let i = 0; i < rocks.length; i++) {
    if (rocks[i][1] > maxDepth) {
      maxDepth = rocks[i][1];
    }
  }

  return maxDepth;
};

const parseCell = (cellStr: string): Cell => {
  return cellStr.split(',').map((i) => parseInt(i));
};

const interpolatePositions = (startCell: Cell, endCell: Cell): Cell[] => {
  const positions: Cell[] = [];

  if (startCell[0] !== endCell[0]) {
    const min = Math.min(startCell[0], endCell[0]);
    const max = Math.max(startCell[0], endCell[0]);

    for (let i = min; i <= max; i++) {
      positions.push([i, startCell[1]]);
    }
  } else {
    const min = Math.min(startCell[1], endCell[1]);
    const max = Math.max(startCell[1], endCell[1]);

    for (let i = min; i <= max; i++) {
      positions.push([startCell[0], i]);
    }
  }

  return positions;
};

export const getRockPositions = (rockPath: string[]): Cell[] => {
  const rockCells = rockPath.map(parseCell);
  const positions: Cell[] = [];

  for (let i = 0; i < rockCells.length - 1; i++) {
    positions.push(...interpolatePositions(rockCells[i], rockCells[i + 1]));
  }

  return positions;
};
