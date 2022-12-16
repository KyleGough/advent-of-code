import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

type Document =
  | Array<DocumentBasis>
  | {
      [index: string]: DocumentBasis;
    };

type DocumentBasis = string | number | Document;

const getNumberSum = (input: Document): number => {
  let sum = 0;

  // Input is an array.
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      const value = input[i];
      if (typeof value === 'number') {
        sum += value;
      } else if (typeof value === 'string') {
        continue;
      } else {
        sum += getNumberSum(value);
      }
    }
  } else {
    // Input is an object.
    for (const item in input) {
      const value = input[item];
      if (typeof value === 'number') {
        sum += value;
      } else if (value === 'red') {
        return 0;
      } else if (typeof value === 'string') {
        continue;
      } else {
        sum += getNumberSum(value);
      }
    }
  }

  return sum;
};

export const day12p2 = (input: string) => {
  return getNumberSum(JSON.parse(input));
};

const input = getPuzzle(__dirname).input;
run(() => day12p2(input)); // 65402
