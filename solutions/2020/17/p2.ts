import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { conwayCubes } from './day17.helper';

export const day17p2 = (input: string) => {
  return conwayCubes(input, 4, 6);
};

const input = getPuzzle(__dirname).input;
run(() => day17p2(input)); // 1980
