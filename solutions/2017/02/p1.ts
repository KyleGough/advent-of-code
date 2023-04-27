import { getPuzzle } from '@utilities/getPuzzle';
import { max, min, sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseRow } from './day02.helper';

const maxDifference = (arr: number[]): number =>
  arr.reduce(max) - arr.reduce(min);

export const day02p1 = (input: string) => {
  return input.split('\n').map(parseRow).map(maxDifference).reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day02p1(input)); // 32121
