import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { isTractorBeam } from './day19.helper';

export const day19p2 = (input: string) => {
  const nums = input.split(',').map(Number);
  let found = false;
  let x = 50;
  let y = 50;
  const size = 100;

  while (!found) {
    x += 1;
    y = findLowestPoint(nums, x, y);

    if (y < size) continue;

    if (canShipFit(nums, x, y, size)) {
      found = true;
    }
  }

  return x * 10000 + (y - size + 1);
};

const findLowestPoint = (nums: number[], x: number, y: number): number => {
  while (!isTractorBeam(nums, x, y) || isTractorBeam(nums, x, y + 1)) {
    y++;
  }

  return y;
};

const canShipFit = (
  nums: number[],
  x: number,
  y: number,
  size: number
): boolean => {
  return (
    isTractorBeam(nums, x + size - 1, y - size + 1) &&
    isTractorBeam(nums, x, y - size + 1) &&
    isTractorBeam(nums, x + size - 1, y) &&
    isTractorBeam(nums, x, y)
  );
};

const input = getPuzzle(__dirname).input;
run(() => day19p2(input)); // 8381082
