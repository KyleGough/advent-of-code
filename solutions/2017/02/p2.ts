import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseRow } from './day02.helper';

const validIntegerDivisionResult = (arr: number[]): number => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j && Number.isInteger(arr[i] / arr[j])) {
        return arr[i] / arr[j];
      }
    }
  }

  return 0;
};

export const day02p2 = (input: string) => {
  return input
    .split('\n')
    .map(parseRow)
    .map(validIntegerDivisionResult)
    .reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day02p2(input)); // 197
