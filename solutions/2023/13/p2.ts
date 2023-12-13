import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getAllReflections } from './day13.helper';
import { sum } from '@utilities/reduce';

export const day13p2 = (input: string) => {
  const patterns = input.split('\n\n');
  return patterns.map(getNewScore).reduce(sum);
};

const getNewScore = (pattern: string): number => {
  const [originalV, originalH] = getAllReflections(pattern);

  for (let n = 0; n < pattern.length; n++) {
    let replaceChar: string;

    if (pattern.charAt(n) === '.') {
      replaceChar = '#';
    } else if (pattern.charAt(n) === '#') {
      replaceChar = '.';
    } else {
      continue;
    }

    const testPattern =
      pattern.slice(0, n) + replaceChar + pattern.slice(n + 1);
    const [testV, testH] = getAllReflections(testPattern);

    if (testV.length) {
      const newV = testV.filter((i) => !originalV.includes(i));
      if (newV.length) {
        return newV.reduce(sum, 0) * 100;
      }
    }
    if (testH.length) {
      const newH = testH.filter((i) => !originalH.includes(i));
      if (newH.length) {
        return newH.reduce(sum, 0);
      }
    }
  }

  return 0;
};

const input = getPuzzle(__dirname).input;
run(() => day13p2(input)); // 32069
