import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { intcodeComputer } from './day05.helper';

export const day05p1 = (input: string) => {
  const nums = input.split(',').map(Number);
  return intcodeComputer(nums, [1]);
};

const input = getPuzzle(__dirname).input;
run(() => day05p1(input)); // 15259545
