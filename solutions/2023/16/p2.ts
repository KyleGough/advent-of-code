import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { countTiles, traceBeam, Vec } from './day16.helper';

export const day16p2 = (input: string) => {
  const grid = input.split('\n').map((row) => row.split(''));
  let maximumTiles = 0;
  const width = grid[0].length;
  const height = grid.length;

  // Starting beam from left and right sides.
  for (let i = 0; i < height; i++) {
    const leftBeam = traceBeam(new Vec(width, i), new Vec(-1, 0), grid);
    const rightBeam = traceBeam(new Vec(-1, i), new Vec(1, 0), grid);
    const tileCount = Math.max(countTiles(leftBeam), countTiles(rightBeam));

    if (tileCount > maximumTiles) {
      maximumTiles = tileCount;
    }
  }

  // Starting beam from top and bottom sides.
  for (let i = 0; i < width; i++) {
    const topBeam = traceBeam(new Vec(i, -1), new Vec(0, 1), grid);
    const bottomBeam = traceBeam(new Vec(i, height), new Vec(0, -1), grid);
    const tileCount = Math.max(countTiles(topBeam), countTiles(bottomBeam));

    if (tileCount > maximumTiles) {
      maximumTiles = tileCount;
    }
  }

  return maximumTiles;
};

const input = getPuzzle(__dirname).input;
run(() => day16p2(input)); // 7673
