import { getPuzzle } from '@utilities/getPuzzle';
import { findNextPassword } from './day11.helper';

export const day11p2 = (input: string) => {
  return findNextPassword(findNextPassword(input));
};

const input = getPuzzle(__dirname).input;
console.log(day11p2(input)); // hxcaabcc
