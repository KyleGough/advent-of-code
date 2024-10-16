import { transpose } from '@utilities/array';
import { getPuzzle } from '@utilities/getPuzzle';
import { modulo } from '@utilities/modulo';
import { run } from '@utilities/run';

export const day25p1 = (input: string) => {
  let grid = input.split('\n').map((row) => row.split(''));
  let staticRight = false;
  let staticDown = false;
  let moves = 0;

  while (!staticRight || !staticDown) {
    [grid, staticRight] = flowRight(grid, '>');
    [grid, staticDown] = flowRight(transpose(grid), 'v');
    grid = transpose(grid);
    moves += 1;
  }

  return moves;
};

const flowRight = (grid: string[][], flow: string): [string[][], boolean] => {
  const width = grid[0].length;
  const height = grid.length;
  const nextGrid: string[][] = [];
  let staticGrid = true;

  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === '.' && grid[y][modulo(x - 1, width)] === flow) {
        row.push(flow);
        staticGrid = false;
      } else if (grid[y][x] === flow && grid[y][modulo(x + 1, width)] === '.') {
        row.push('.');
        staticGrid = false;
      } else {
        row.push(grid[y][x]);
      }
    }

    nextGrid.push(row);
  }

  return [nextGrid, staticGrid];
};

const input = getPuzzle(__dirname).input;
run(() => day25p1(input)); // 278
