import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

const encodedStringLengthDiff = (item: string): number => {
  return item.split('').filter((i) => i === '"' || i === '\\').length + 2;
};

export const day08p2 = (input: string) => {
  const items = input.split('\n');
  return items.map(encodedStringLengthDiff).reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day08p2(input)); // 2117
