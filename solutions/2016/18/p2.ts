import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { countSafeTiles } from './day18.helper';

export const day18p2 = (input: string) => {
  return countSafeTiles(input, 400000);
};

const input = getPuzzle(__dirname).input;
run(() => day18p2(input)); // 19995121
