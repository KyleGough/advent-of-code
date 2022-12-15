import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day05p2 = (input: string) => {
  return input
    .split('\n')
    .map((str) => {
      const patternA = /([a-z])([a-z]).*\1\2/.test(str);
      const patternB = /([a-z]).\1/.test(str);
      return patternA && patternB;
    })
    .reduce((prev, curr) => (curr ? prev + 1 : prev), 0);
};

const input = getPuzzle(__dirname).input;
run(() => day05p2(input)); // 69
