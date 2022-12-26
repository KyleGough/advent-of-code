import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getMinimumQE } from './day24.helper';

export const day24p2 = (input: string) => {
  const weights = input
    .split('\n')
    .map((i) => parseInt(i))
    .reverse();
  return getMinimumQE(weights, 4);
};

const input = getPuzzle(__dirname).input;
run(() => day24p2(input)); // 74850409
