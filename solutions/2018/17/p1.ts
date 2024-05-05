import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  createGrid,
  getBoundingBox,
  parseWall,
  Reservoir,
} from './day17.helper';

export const day17p1 = (input: string) => {
  const walls = input.split('\n').map(parseWall);
  const box = getBoundingBox(walls);
  const grid = createGrid(box, walls);
  const reservoir = new Reservoir(grid, box.maxX - box.minX);
  const sourceX = 500 - box.minX;
  reservoir.flowWater(sourceX);
  return reservoir.countWater();
};

const input = getPuzzle(__dirname).input;
run(() => day17p1(input)); // 28246
