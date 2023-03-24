import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { nextCipher } from './day22.helper';

export const day21p2 = (input: string) => {
  const cipherText = 'fbgdceah'.split('');
  const instructions = input.split('\n');
  instructions.reverse();

  const finalCipher = instructions.reduce(
    (prev, curr) => nextCipher(curr, prev, true),
    cipherText
  );

  return finalCipher.join('');
};

const input = getPuzzle(__dirname).input;
run(() => day21p2(input)); // cegdahbf
