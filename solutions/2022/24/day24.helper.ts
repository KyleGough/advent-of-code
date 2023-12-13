import { transpose } from '@utilities/array';

type Grid = boolean[][];

interface StaticData {
  hGrids: Grid[];
  vGrids: Grid[];
  width: number;
  height: number;
}

// Parse up and down blizzard directions.
export const parseVertical = (input: string[][]) => {
  const inputGrid = transpose(input);
  const upGrids = parseBlizzardDirection(inputGrid, '^', mutateRowLeft);
  const downGrids = parseBlizzardDirection(inputGrid, 'v', mutateRowRight);
  const verticalGrids = [];

  for (let i = 0; i < upGrids.length; i++) {
    verticalGrids.push(transpose(mergeGrids(upGrids[i], downGrids[i])));
  }

  return verticalGrids;
};

// Parse left and right blizzard directions.
export const parseHorizontal = (input: string[][]) => {
  const inputGrid = input;
  const leftGrids = parseBlizzardDirection(inputGrid, '<', mutateRowLeft);
  const rightGrids = parseBlizzardDirection(inputGrid, '>', mutateRowRight);
  const horizontalGrids = [];

  for (let i = 0; i < leftGrids.length; i++) {
    horizontalGrids.push(mergeGrids(leftGrids[i], rightGrids[i]));
  }

  return horizontalGrids;
};

const parseBlizzardDirection = (
  input: string[][],
  token: string,
  mutateFn: (row: boolean[]) => boolean[]
) => {
  const rows = input.map((row) => row.map((i) => i === '#' || i === token));
  const height = rows.length;
  const width = rows[0].length;

  const grids: Grid[] = [rows];
  let currentGrid = rows;
  let nextGrid;

  for (let i = 0; i < width - 3; i++) {
    nextGrid = [
      currentGrid[0],
      ...currentGrid.slice(1, height - 1).map((i) => mutateFn(i)),
      currentGrid[height - 1],
    ];
    grids.push(nextGrid);
    currentGrid = nextGrid;
  }

  return grids;
};

// Check an entry already exists in the stack.
const existsInStack = (
  stack: number[][],
  x: number,
  y: number,
  t: number
): boolean => {
  for (let i = 0; i < stack.length; i++) {
    if (stack[i][2] === t && stack[i][1] === y && stack[i][0] === x)
      return true;
  }
  return false;
};

const mutateRowLeft = <T>(row: T[]): T[] => {
  return [row[0], ...row.slice(2, row.length - 1), row[1], row[row.length - 1]];
};

const mutateRowRight = <T>(row: T[]): T[] => {
  return [
    row[0],
    row[row.length - 2],
    ...row.slice(1, -2),
    row[row.length - 1],
  ];
};

const mergeGrids = (gridA: Grid, gridB: Grid): Grid => {
  const mergedGrid = [];

  for (let y = 0; y < gridA.length; y++) {
    const row = [];
    for (let x = 0; x < gridA[0].length; x++) {
      row.push(gridA[y][x] || gridB[y][x]);
    }
    mergedGrid.push(row);
  }

  return mergedGrid;
};

// Get coordinates of the empty tile for a given grid row.
export const getTargetCoords = (grid: string[][], y: number) => {
  let startX = 0;

  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === '.') {
      startX = x;
      break;
    }
  }

  return [startX, y];
};

export const pathTime = (
  startX: number,
  startY: number,
  startT: number,
  endX: number,
  endY: number,
  staticData: StaticData
) => {
  const { hGrids, vGrids, width, height } = staticData;
  const stack = [[startX, startY, startT]];
  let minTime = Number.MAX_VALUE;

  while (stack.length) {
    const [x, y, t] = stack.pop() as number[];

    // If current time plus Manhattan distance is greater than current minimum time, then prune branch.
    if (Math.abs(x - endX) + Math.abs(y - endY) + t > minTime) {
      continue;
    }

    // If coords are the end point, update the minimum time.
    if (x === endX && y === endY && t < minTime) {
      minTime = t;
      continue;
    }

    const nextH = hGrids[(t + 1) % hGrids.length];
    const nextV = vGrids[(t + 1) % vGrids.length];

    // Direction/wait checks.
    const left = x - 1 >= 0 && !nextH[y][x - 1] && !nextV[y][x - 1];
    const right = x + 1 < width && !nextH[y][x + 1] && !nextV[y][x + 1];
    const up = y - 1 >= 0 && !nextH[y - 1][x] && !nextV[y - 1][x];
    const down = y + 1 < height && !nextH[y + 1][x] && !nextV[y + 1][x];
    const wait = !nextH[y][x] && !nextV[y][x];

    // Branch
    if (down && !existsInStack(stack, x, y + 1, t + 1)) {
      stack.unshift([x, y + 1, t + 1]);
    }
    if (right && !existsInStack(stack, x + 1, y, t + 1)) {
      stack.unshift([x + 1, y, t + 1]);
    }
    if (left && !existsInStack(stack, x - 1, y, t + 1)) {
      stack.unshift([x - 1, y, t + 1]);
    }
    if (up && !existsInStack(stack, x, y - 1, t + 1)) {
      stack.unshift([x, y - 1, t + 1]);
    }
    if (wait && !existsInStack(stack, x, y, t + 1)) {
      stack.unshift([x, y, t + 1]);
    }
  }

  return minTime;
};
