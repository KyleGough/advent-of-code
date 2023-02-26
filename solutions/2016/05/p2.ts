import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import * as md5 from 'md5';

export const day05p2 = (input: string) => {
  let i = 0;
  const output = Array<string>(8);
  const positions = new Set([...Array(8).keys()]);

  while (positions.size > 0) {
    const hash = md5(`${input}${i}`);
    if (hash.slice(0, 5) === '00000') {
      const index = parseInt(hash[5]);
      if (positions.has(index)) {
        output[index] = hash[6];
        positions.delete(index);
      }
    }
    i++;
  }

  return output.join('');
};

const input = getPuzzle(__dirname).input;
run(() => day05p2(input)); // 863dde27
