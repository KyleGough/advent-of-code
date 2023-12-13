import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getAllReflections } from './day13.helper';
import { sum } from '@utilities/reduce';

export const day13p1 = (input: string) => {
  const patterns = input.split('\n\n');

  let total = 0;

  for (let i = 0; i < patterns.length; i++) {
    const [vReflections, hReflections] = getAllReflections(patterns[i]);
    total += vReflections.reduce(sum, 0) * 100;
    total += hReflections.reduce(sum, 0);
  }

  return total;
};

const input = getPuzzle(__dirname).input;
run(() => day13p1(input)); // 39939
