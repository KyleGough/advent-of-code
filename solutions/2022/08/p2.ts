import { getPuzzle } from '@utilities/getPuzzle';

const lineOfSight = (arr: number[], treeHeight: number) => {
  const idx = arr.findIndex((i) => i >= treeHeight);
  return idx === -1 ? arr.length : idx + 1;
};

export const day08p2 = (input: string) => {
  const grid = input
    .split('\n')
    .map((i) => i.split('').map((j) => parseInt(j)));
  const width = grid[0].length;
  const height = grid.length;
  let maxScenicScore = 0;

  // Loop over inner cells.
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const treeHeight = grid[y][x];

      const scenicScore = [
        grid[y].slice(0, x).reverse(),
        grid[y].slice(x + 1, width),
        grid
          .slice(0, y)
          .map((row) => row[x])
          .reverse(),
        grid.slice(y + 1, height).map((row) => row[x]),
      ]
        .map((i) => lineOfSight(i, treeHeight))
        .reduce((prev, curr) => prev * curr, 1);

      if (scenicScore > maxScenicScore) {
        maxScenicScore = scenicScore;
      }
    }
  }
  return maxScenicScore;
};

const input = getPuzzle(__dirname).input;
console.log(day08p2(input)); // 313200
