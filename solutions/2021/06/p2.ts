import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getFishCount, getInitialFish } from './day06.helper';

export const day06p2 = (input: string) => {
  return getFishCount(getInitialFish(input), 256);
};

const input = getPuzzle(__dirname).input;
run(() => day06p2(input)); // 1770823541496
