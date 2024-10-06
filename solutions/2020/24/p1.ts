import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getInitialBlackTiles } from './day24.helper';

export const day24p1 = (input: string) => {
  const directions = input.split('\n');
  return getInitialBlackTiles(directions).size;
};

const input = getPuzzle(__dirname).input;
run(() => day24p1(input)); // 479
