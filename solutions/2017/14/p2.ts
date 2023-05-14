import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { hashGrid } from './day14.helper';

const neighbours = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const oneCellSet = (grid: string[][]): Set<string> => {
  const cells = new Set<string>();

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === '1') {
        cells.add(`${i},${j}`);
      }
    }
  }

  return cells;
};

const neighbourCells = (row: number, col: number): string[] =>
  neighbours.map((i) => `${row + i[0]},${col + i[1]}`);

export const day14p2 = (input: string) => {
  const grid = hashGrid(input);
  const cells = oneCellSet(grid);
  let groupCount = 0;

  while (cells.size) {
    const firstCell = [...cells][0];
    const stack = [firstCell];

    while (stack.length) {
      const currentCell = stack.pop() as string;
      const [row, col] = currentCell.split(',').map((i) => parseInt(i));
      const neighbourList = neighbourCells(row, col);

      for (const n of neighbourList) {
        if (cells.has(n)) {
          stack.push(n);
          cells.delete(n);
        }
      }
    }

    cells.delete(firstCell);
    groupCount++;
  }

  return groupCount;
};

const input = getPuzzle(__dirname).input;
run(() => day14p2(input)); // 1086
