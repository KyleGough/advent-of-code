import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { dance } from './day16.helper';

export const day16p1 = (input: string) => {
  const moves = input.split(',');
  const dancers = 'abcdefghijklmnop'.split('');
  return dance(moves, dancers).join('');
};

const input = getPuzzle(__dirname).input;
run(() => day16p1(input)); // fgmobeaijhdpkcln
