import { getPuzzle } from '@utilities/getPuzzle';
import { product } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseTile } from './day20.helper';

export const day20p1 = (input: string) => {
  const tiles = input.split('\n\n').map(parseTile);
  const allBorders = tiles.map((t) => t.borderIds).flat();
  const corners: number[] = [];

  for (const { id, borderIds } of tiles) {
    let noMatchCount = 0;
    for (const border of borderIds) {
      if (allBorders.filter((b) => b === border).length === 1) {
        noMatchCount += 1;
      }
    }

    if (noMatchCount === 2) {
      corners.push(id);
    }
  }

  return corners.reduce(product, 1);
};

const input = getPuzzle(__dirname).input;
run(() => day20p1(input)); // 13983397496713
