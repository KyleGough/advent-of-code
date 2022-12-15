import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day12p2 = (input: string) => {
  return getNumberSum(JSON.parse(input));
};

const getNumberSum = (input: any): number => {
  let sum = 0;

  // Input is an array.
  if (input.length) {
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
    return sum;
  }

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

  return sum;
};

const input = getPuzzle(__dirname).input;
run(() => day12p2(input)); // 65402
