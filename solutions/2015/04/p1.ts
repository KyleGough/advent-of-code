import { getPuzzle } from '@utilities/getPuzzle';
import * as md5 from 'md5';

export const day04p1 = (input: string) => {
  let count = 1;
  while (true) {
    const hash = md5(`${input}${count}`);
    if (hash.slice(0, 5) === '00000') {
      return count;
    }
    count++;
  }
};

const input = getPuzzle(__dirname).input;
console.log(day04p1(input)); // 282749
