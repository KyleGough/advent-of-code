import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { exploreMaze } from './day15.helper';

export const day15p1 = (input: string) => {
  const nums = input.split(',').map(Number);
  const { stack } = exploreMaze(nums);
  return stack.size() + 1;
};

const input = getPuzzle(__dirname).input;
run(() => day15p1(input)); // 262
