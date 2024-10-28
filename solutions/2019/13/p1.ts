import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getTiles } from './day13.helper';

export const day13p1 = (input: string) => {
  const nums = input.split(',').map(Number);
  const tiles = getTiles(nums);
  const blockTiles = tiles.filter((tile) => tile.id === 2);
  return blockTiles.length;
};

const input = getPuzzle(__dirname).input;
run(() => day13p1(input)); // 324
