import { Intcode } from '../05/day05.helper';

interface Tile {
  x: number;
  y: number;
  id: number;
}

export const getTiles = (nums: number[]): Tile[] => {
  const program = new Intcode(nums);
  const tiles: Tile[] = [];

  while (!program.halt) {
    const x = program.awaitOutput([]);
    const y = program.awaitOutput([]);
    const id = program.awaitOutput([]);
    tiles.push({ x, y, id });
  }

  return tiles;
};
