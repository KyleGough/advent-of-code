import { getPuzzle } from '@utilities/getPuzzle';
import { max } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseClaim } from './day03.helper';

export const day03p1 = (input: string) => {
  const claims = input.split('\n').map(parseClaim);
  const maxX = claims.map((i) => i.x + i.width).reduce(max);
  const maxY = claims.map((i) => i.y + i.height).reduce(max);
  let overlaps = 0;

  for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
      const count = claims.filter(
        (claim) =>
          x >= claim.x &&
          x < claim.x + claim.width &&
          y >= claim.y &&
          y < claim.y + claim.height
      ).length;
      if (count >= 2) {
        overlaps++;
      }
    }
  }

  return overlaps;
};

const input = getPuzzle(__dirname).input;
run(() => day03p1(input)); // 104712
