import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getRobotPainting } from './day11.helper';

export const day11p1 = (input: string) => {
  const nums = input.split(',').map(Number);
  const painting = getRobotPainting(nums, 0);
  return Object.keys(painting).length;
};

const input = getPuzzle(__dirname).input;
run(() => day11p1(input)); // 1876
