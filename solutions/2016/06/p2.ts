import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getCharCounts } from './day06.helper';

const leastCommonChar = (counts: Record<string, number>): string => {
  let minCount = Number.MAX_VALUE;
  let char = '';
  for (const [k, v] of Object.entries(counts)) {
    if (v < minCount) {
      minCount = v;
      char = k;
    }
  }

  return char;
};

export const day06p2 = (input: string) => {
  const messages = input.split('\n');
  const counts = getCharCounts(messages);
  return counts.map(leastCommonChar).join('');
};

const input = getPuzzle(__dirname).input;
run(() => day06p2(input)); // uwpfaqrq
