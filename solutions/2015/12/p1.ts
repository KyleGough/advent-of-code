import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day12p1 = (input: string) => {
  const matches = [...input.matchAll(/(-?\d+)/g)].map((i) => parseInt(i[0]));
  return matches.reduce((prev, curr) => prev + curr, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day12p1(input)); // 111754
