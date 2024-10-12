import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { dijkstras, Grid } from './day15.helper';

export const day15p2 = (input: string) => {
  const grid = new ExtendedGrid(
    input.split('\n').map((row) => row.split('').map(Number)),
    5
  );
  return dijkstras(grid);
};

class ExtendedGrid extends Grid {
  private tiles: number;

  constructor(grid: number[][], tiles: number) {
    super(grid);
    this.tiles = tiles;
  }

  get(x: number, y: number): number {
    const xTile = Math.floor(x / this.grid[0].length);
    const yTile = Math.floor(y / this.grid.length);
    const offset = xTile + yTile;
    const value = this.grid[y % this.grid.length][x % this.grid[0].length];
    return ((value + offset - 1) % 9) + 1;
  }

  width(): number {
    return this.grid[0].length * this.tiles;
  }

  height(): number {
    return this.grid.length * this.tiles;
  }
}

const input = getPuzzle(__dirname).input;
run(() => day15p2(input)); // 2800
