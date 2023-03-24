import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { nextCipher } from './day22.helper';

export const day21p1 = (input: string) => {
  const cipherText = 'abcdefgh'.split('');
  const instructions = input.split('\n');

  const finalCipher = instructions.reduce(
    (prev, curr) => nextCipher(curr, prev, false),
    cipherText
  );

  return finalCipher.join('');
};

const input = getPuzzle(__dirname).input;
run(() => day21p1(input)); // baecdfgh
