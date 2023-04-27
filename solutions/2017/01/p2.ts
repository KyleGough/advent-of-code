import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { matchSum } from './day01.helper';

export const day01p2 = (input: string) => {
  const digits = input.split('').map((i) => parseInt(i));
  return matchSum(digits, digits.length / 2);
};

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 1244
