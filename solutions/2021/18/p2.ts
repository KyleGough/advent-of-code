import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { addPairs, getMagnitude, parseFlatPairs } from './day18.helper';

export const day18p2 = (input: string) => {
  const numbers = input.split('\n').map(parseFlatPairs);
  let max = 0;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i === j) {
        continue;
      }

      const value = getMagnitude(addPairs(numbers[i], numbers[j]));

      if (value > max) {
        max = value;
      }
    }
  }

  return max;
};

const input = getPuzzle(__dirname).input;
run(() => day18p2(input)); // 4731
