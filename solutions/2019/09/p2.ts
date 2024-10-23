import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { intcodeComputer } from '../05/day05.helper';

export const day09p2 = (input: string) => {
  const nums = input.split(',').map(Number);
  return intcodeComputer(nums, [2]);
};

const input = getPuzzle(__dirname).input;
run(() => day09p2(input)); // 35734
