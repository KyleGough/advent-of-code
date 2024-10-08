import { sum } from '@utilities/reduce';

class BingoBoard {
  lines: number[][];

  constructor(grid: number[][]) {
    this.lines = [...grid];

    for (let x = 0; x < grid[0].length; x++) {
      this.lines.push(grid.map((row) => row[x]));
    }
  }

  checkNumber(num: number): void {
    this.lines = this.lines.map((line) => line.filter((x) => x !== num));
  }

  isBingo(): boolean {
    for (const line of this.lines) {
      if (!line.length) {
        return true;
      }
    }

    return false;
  }

  getScore(): number {
    return this.lines.map((line) => line.reduce(sum, 0)).reduce(sum, 0) / 2;
  }
}

export const parseBoard = (input: string): BingoBoard => {
  const rows = input.split('\n');
  const grid = rows.map((row) => row.trim().split(/\s+/).map(Number));
  return new BingoBoard(grid);
};
