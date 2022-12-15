import { getPuzzle } from '@utilities/getPuzzle';
import { findNextPassword } from './day11.helper';

export const day11p1 = (input: string) => {
  return findNextPassword(input);
};

const input = getPuzzle(__dirname).input;
console.log(day11p1(input)); // hxbxxyzz
