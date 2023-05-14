import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { knotHash } from './day10.helper';

export const day10p1 = (input: string) => {
  const lengths = input.split(',').map((i) => parseInt(i));
  const list = knotHash(lengths);
  return list[0] * list[1];
};

const input = getPuzzle(__dirname).input;
run(() => day10p1(input)); // 9656
