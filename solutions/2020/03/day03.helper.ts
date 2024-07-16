import { modulo } from '@utilities/modulo';

export const getTreesEncountered = (
  grid: string[][],
  slopeX: number,
  slopeY: number
): number => {
  const width = grid[0].length;
  const height = grid.length;
  let treeCount = 0;
  let x = 0;
  let y = 0;

  do {
    if (grid[y][x] === '#') {
      treeCount += 1;
    }
    x = modulo(x + slopeX, width);
    y += slopeY;
  } while (y < height);

  return treeCount;
};
