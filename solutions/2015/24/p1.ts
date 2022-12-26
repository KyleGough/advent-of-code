import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getMinimumQE } from './day24.helper';

export const day24p1 = (input: string) => {
  const weights = input
    .split('\n')
    .map((i) => parseInt(i))
    .reverse();
  return getMinimumQE(weights, 3);
};

const input = getPuzzle(__dirname).input;
run(() => day24p1(input)); // 10723906903
