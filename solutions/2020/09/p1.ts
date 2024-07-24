import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customConfig } from './customConfig';
import { getInvalidNum } from './day09.helper';

export const day09p1 = (input: string, preamble: number) => {
  const nums = input.split('\n').map(Number);
  return getInvalidNum(nums, preamble);
};

const input = getPuzzleWithConfig(__dirname, customConfig).input;
run(() => day09p1(...input)); // 1038347917
