import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { matchNumbers } from '@utilities/string';
import { getCave } from './day22.helper';

export const day22p1 = (input: string) => {
  const lines = input.split('\n');
  const depth = matchNumbers(lines[0])[0];
  const [tx, ty] = matchNumbers(lines[1]);
  const cave = getCave(depth, tx, ty);
  return cave.map((r) => r.reduce(sum, 0)).reduce(sum, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day22p1(input)); // 9899
