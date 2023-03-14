import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getPadKeyIndex } from './day14.helper';

export const day14p2 = (input: string) => {
  return getPadKeyIndex(input, 64, 2017);
};

const input = getPuzzle(__dirname).example;
run(() => day14p2(input)); // 22696
