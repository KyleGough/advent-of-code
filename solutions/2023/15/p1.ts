import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { hashCode } from './day15.helper';

export const day15p1 = (input: string) => {
  const codes = input.split(',');
  return codes.map(hashCode).reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day15p1(input)); // 505427
