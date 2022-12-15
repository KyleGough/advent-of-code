import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { findNextPassword } from './day11.helper';

export const day11p2 = (input: string) => {
  return findNextPassword(findNextPassword(input));
};

const input = getPuzzle(__dirname).input;
run(() => day11p2(input)); // hxcaabcc
