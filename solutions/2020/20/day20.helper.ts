import { sum } from '@utilities/reduce';

const reverse = (input: string): string => input.split('').reverse().join('');

const parseBorder = (input: string): number => {
  return parseInt(input.replaceAll('#', '1').replaceAll('.', '0'), 2);
};

const getBorderValue = (input: string): number => {
  const a = parseBorder(input);
  const b = parseBorder(reverse(input));
  return a < b ? a : b;
};

export class Grid {
  constructor(public grid: string[][], public transforms = 0) {}

  rotateCW() {
    const rotatedGrid: string[][] = [];
    const size = this.grid.length;

    for (let x = 0; x < size; x++) {
      const row: string[] = [];
      for (let y = size - 1; y >= 0; y--) {
        row.push(this.grid[y][x]);
      }
      rotatedGrid.push(row);
    }

    this.grid = rotatedGrid;
    this.transforms += 1;
  }

  flip() {
    this.grid = this.grid.map((row) => row.reverse());
    this.transforms += 1;
  }

  transform() {
    if (this.transforms === 3) {
      this.flip();
    } else if (this.transforms < 7) {
      this.rotateCW();
    } else {
      throw new Error('Too many transforms');
    }
  }

  getTopBorder(): string {
    return this.grid[0].join('');
  }

  getBottomBorder(): string {
    return this.grid[this.grid.length - 1].join('');
  }

  getLeftBorder(): string {
    return this.grid.map((row) => row[0]).join('');
  }

  getRightBorder(): string {
    return this.grid.map((row) => row[row.length - 1]).join('');
  }

  countCells(match: string): number {
    return this.grid
      .map((row) => row.filter((cell) => cell === match).length)
      .reduce(sum, 0);
  }
}

export class Tile {
  id: number;
  borderIds: number[];
  grid: Grid;
  type: string;
  matchCounts: number[];
  transforms: number;

  constructor(id: number, borderIds: number[], grid: string[][]) {
    this.id = id;
    this.borderIds = borderIds;
    this.grid = new Grid(grid);
    this.type = '';
    this.matchCounts = [];
    this.transforms = 0;
  }

  enrichTile(allBorders: number[]) {
    const matchCounts: number[] = [];
    let borderMatches = 0;

    for (const border of this.borderIds) {
      const matchCount = allBorders.filter((b) => b === border).length;
      matchCounts.push(matchCount);
      if (matchCount > 1) {
        borderMatches += 1;
      }
    }

    this.matchCounts = matchCounts;

    switch (borderMatches) {
      case 2:
        this.type = 'CORNER';
        break;
      case 3:
        this.type = 'EDGE';
        break;
      case 4:
        this.type = 'NORMAL';
        break;
      default:
        throw new Error('Unknown tile piece found');
    }
  }

  rotateCW() {
    this.borderIds = [this.borderIds[3], ...this.borderIds.slice(0, -1)];
    this.matchCounts = [this.matchCounts[3], ...this.matchCounts.slice(0, -1)];
    this.grid.rotateCW();
    this.transforms += 1;
  }

  flip() {
    const [bt, br, bb, bl] = this.borderIds;
    this.borderIds = [bt, bl, bb, br];
    const [mt, mr, mb, ml] = this.matchCounts;
    this.matchCounts = [mt, ml, mb, mr];
    this.grid.flip();
    this.transforms += 1;
  }

  transform() {
    if (this.transforms === 3) {
      this.flip();
    } else if (this.transforms < 7) {
      this.rotateCW();
    } else {
      throw new Error('Too many transforms');
    }
  }
}

export const parseTile = (input: string): Tile => {
  const lines = input.split('\n');
  const id = parseInt(lines[0].split(' ')[1].slice(0, -1));
  const grid = lines.slice(1);
  const borders: string[] = [];

  const left = grid.map((r) => r.charAt(0)).join('');
  const right = grid.map((r) => r.charAt(r.length - 1)).join('');

  borders.push(grid[0]);
  borders.push(right);
  borders.push(grid[grid.length - 1]);
  borders.push(left);

  return new Tile(
    id,
    borders.map(getBorderValue),
    grid.map((row) => row.split(''))
  );
};
