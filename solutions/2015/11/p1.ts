import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { findNextPassword } from './day11.helper';

export const day11p1 = (input: string) => {
  return findNextPassword(input);
};

const input = getPuzzle(__dirname).input;
run(() => day11p1(input)); // hxbxxyzz
