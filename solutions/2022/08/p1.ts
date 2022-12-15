import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day08p1 = (input: string) => {
  const grid = input
    .split('\n')
    .map((i) => i.split('').map((j) => parseInt(j)));
  const width = grid[0].length;
  const height = grid.length;

  let visibleTreeCount = 0;

  // Loop over inner cells.
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const treeHeight = grid[y][x];

      const leftMax = Math.max(...grid[y].slice(0, x));
      const rightMax = Math.max(...grid[y].slice(x + 1, width));
      const topMax = Math.max(...grid.slice(0, y).map((row) => row[x]));
      const bottomMax = Math.max(
        ...grid.slice(y + 1, height).map((row) => row[x])
      );

      const treeVisible = [leftMax, rightMax, topMax, bottomMax]
        .map((i) => treeHeight > i)
        .some((i) => !!i);

      if (treeVisible) visibleTreeCount++;
    }
  }
  return visibleTreeCount + 2 * width + 2 * height - 4;
};

const input = getPuzzle(__dirname).input;
run(() => day08p1(input)); // 1676
