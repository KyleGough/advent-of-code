import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day01p1 = (input: string) => {
  return input.split('\n').map(filterDigits).map(getValue).reduce(sum);
};

const filterDigits = (input: string): string[] => {
  return input.split('').filter((i) => i.match(/[0-9]/));
};

const getValue = (input: string[]): number => {
  return parseInt(`${input[0]}${input[input.length - 1]}`);
};

const input = getPuzzle(__dirname).input;
run(() => day01p1(input)); // 55447
