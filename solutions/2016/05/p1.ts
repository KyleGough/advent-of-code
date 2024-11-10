import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import md5 from 'md5';

export const day05p1 = (input: string) => {
  let output = '';
  let i = 0;

  while (output.length < 8) {
    const hash = md5(`${input}${i}`);
    if (hash.slice(0, 5) === '00000') {
      output += hash[5];
    }
    i++;
  }

  return output;
};

const input = getPuzzle(__dirname).input;
run(() => day05p1(input)); // f97c354d
