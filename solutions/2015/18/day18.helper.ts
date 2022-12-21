import { sum, trueCount } from '@utilities/reduce';

export type Grid = boolean[][];

export const animate = (grid: Grid) => {
  const size = grid.length;
  const nextGrid: Grid = [];

  for (let row = 0; row < size; row++) {
    const nextRow: boolean[] = [];

    for (let col = 0; col < size; col++) {
      let neighbours = 0;

      const leftBound = col - 1 >= 0;
      const rightBound = col + 1 < size;
      const topBound = row - 1 >= 0;
      const bottomBound = row + 1 < size;

      // Top-left
      if (leftBound && topBound && grid[row - 1][col - 1]) neighbours++;
      // Top
      if (topBound && grid[row - 1][col]) neighbours++;
      // Top-right
      if (rightBound && topBound && grid[row - 1][col + 1]) neighbours++;
      // Left
      if (leftBound && grid[row][col - 1]) neighbours++;
      // Right
      if (rightBound && grid[row][col + 1]) neighbours++;
      // Bottom-left
      if (leftBound && bottomBound && grid[row + 1][col - 1]) neighbours++;
      // Bottom
      if (bottomBound && grid[row + 1][col]) neighbours++;
      // Bottom-right
      if (rightBound && bottomBound && grid[row + 1][col + 1]) neighbours++;

      // Next state.
      nextRow.push(neighbours === 3 || (neighbours === 2 && grid[row][col]));
    }

    nextGrid.push(nextRow);
  }

  return nextGrid;
};

export const lightCount = (grid: Grid): number =>
  grid.map((row) => row.reduce(trueCount, 0)).reduce(sum);
