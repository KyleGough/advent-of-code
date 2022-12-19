import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day12p1 = (input: string) => {
  const matches = [...input.matchAll(/(-?\d+)/g)].map((i) => parseInt(i[0]));
  return matches.reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day12p1(input)); // 111754
