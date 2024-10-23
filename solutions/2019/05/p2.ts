import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { intcodeComputer } from './day05.helper';

export const day05p2 = (input: string) => {
  const nums = input.split(',').map(Number);
  return intcodeComputer(nums, [5]);
};

const input = getPuzzle(__dirname).input;
run(() => day05p2(input)); // 7616021
