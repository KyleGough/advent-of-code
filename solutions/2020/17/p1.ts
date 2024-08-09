import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { conwayCubes } from './day17.helper';

export const day17p1 = (input: string) => {
  return conwayCubes(input, 3, 6);
};

const input = getPuzzle(__dirname).input;
run(() => day17p1(input)); // 362
