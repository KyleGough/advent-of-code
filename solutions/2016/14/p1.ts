import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getPadKeyIndex } from './day14.helper';

export const day14p1 = (input: string) => {
  return getPadKeyIndex(input, 64, 1);
};

const input = getPuzzle(__dirname).input;
run(() => day14p1(input)); // 23890
