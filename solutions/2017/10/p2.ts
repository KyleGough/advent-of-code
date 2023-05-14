import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { denseHash } from './day10.helper';

export const day10p2 = (input: string) => {
  const lengths = input.split('').map((i) => i.charCodeAt(0));
  lengths.push(...[17, 31, 73, 47, 23]);
  return denseHash(lengths, 64);
};

const input = getPuzzle(__dirname).input;
run(() => day10p2(input)); // 20b7b54c92bf73cf3e5631458a715149
