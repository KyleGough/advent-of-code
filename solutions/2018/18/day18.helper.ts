import { sum } from '@utilities/reduce';

export enum Acre {
  OPEN = '.',
  TREE = '|',
  LUMBER = '#',
}

type Coord = {
  x: number;
  y: number;
};

export const countAcres = (grid: string[][], type: Acre): number => {
  return grid
    .map((row) => row.filter((acre) => acre === type).length)
    .reduce(sum, 0);
};

const convolutions: Coord[] = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

export const simulateMinute = (grid: string[][]): string[][] => {
  const nextGrid: string[][] = [];

  for (let y = 0; y < grid.length; y++) {
    const nextRow = [];
    for (let x = 0; x < grid[y].length; x++) {
      const currentAcre = grid[y][x];
      const acres = convolutions.map((c) => grid?.[y + c.y]?.[x + c.x]);
      const treeCount = acres.filter((acre) => acre === Acre.TREE).length;
      const lumberCount = acres.filter((acre) => acre === Acre.LUMBER).length;

      switch (currentAcre) {
        case Acre.OPEN:
          nextRow.push(treeCount >= 3 ? Acre.TREE : Acre.OPEN);
          break;
        case Acre.TREE:
          nextRow.push(lumberCount >= 3 ? Acre.LUMBER : Acre.TREE);
          break;
        case Acre.LUMBER:
          nextRow.push(
            lumberCount >= 1 && treeCount >= 1 ? Acre.LUMBER : Acre.OPEN
          );
          break;
      }
    }
    nextGrid.push(nextRow);
  }

  return nextGrid;
};
