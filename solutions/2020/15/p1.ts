import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { findNthSpoken } from './day15.helper';

export const day15p1 = (input: string) => {
  const startingNums = input.split(',').map(Number);
  return findNthSpoken(startingNums, 2020);
};

const input = getPuzzle(__dirname).input;
run(() => day15p1(input)); // 1618
