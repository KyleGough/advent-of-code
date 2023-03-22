import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { countSafeTiles } from './day18.helper';

export const day18p1 = (input: string) => {
  return countSafeTiles(input, 40);
};

const input = getPuzzle(__dirname).input;
run(() => day18p1(input)); // 1956
