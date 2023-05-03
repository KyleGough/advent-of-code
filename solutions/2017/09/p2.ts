import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { processIgnores } from './day09.helper';

const countGarbage = (input: string): number => {
  let isGarbage = false;
  let i = 0;
  let garbageCount = 0;

  while (i < input.length) {
    if (!isGarbage && input.charAt(i) === '<') {
      isGarbage = true;
    } else if (isGarbage && input.charAt(i) === '>') {
      isGarbage = false;
    } else if (isGarbage) {
      garbageCount++;
    }
    i++;
  }

  return garbageCount;
};

export const day09p2 = (input: string) => {
  return countGarbage(processIgnores(input));
};

const input = getPuzzle(__dirname).input;
run(() => day09p2(input)); // 7298
