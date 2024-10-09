import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getFishCount, getInitialFish } from './day06.helper';

export const day06p1 = (input: string) => {
  return getFishCount(getInitialFish(input), 80);
};

const input = getPuzzle(__dirname).input;
run(() => day06p1(input)); // 396210
