import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { processIgnores } from './day09.helper';

const processGarbage = (input: string): string => {
  let isGarbage = false;
  let i = 0;
  const output = [];

  while (i < input.length) {
    if (!isGarbage && input.charAt(i) === '<') {
      isGarbage = true;
    } else if (isGarbage && input.charAt(i) === '>') {
      isGarbage = false;
    } else if (!isGarbage) {
      output.push(input.charAt(i));
    }
    i++;
  }

  return output.join('');
};

const processGroups = (input: string): number => {
  let i = 0;
  let depth = 0;
  let total = 0;

  while (i < input.length) {
    if (input.charAt(i) === '{') {
      depth++;
    } else if (input.charAt(i) === '}') {
      total += depth;
      depth--;
    }
    i++;
  }

  return total;
};

export const day09p1 = (input: string) => {
  return processGroups(processGarbage(processIgnores(input)));
};

const input = getPuzzle(__dirname).input;
run(() => day09p1(input)); // 16827
