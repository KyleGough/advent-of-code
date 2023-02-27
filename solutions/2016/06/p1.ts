import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getCharCounts } from './day06.helper';

const mostCommonChar = (counts: Record<string, number>): string => {
  let maxCount = 0;
  let char = '';
  for (const [k, v] of Object.entries(counts)) {
    if (v > maxCount) {
      maxCount = v;
      char = k;
    }
  }

  return char;
};

export const day06p1 = (input: string) => {
  const messages = input.split('\n');
  const counts = getCharCounts(messages);
  return counts.map(mostCommonChar).join('');
};

const input = getPuzzle(__dirname).input;
run(() => day06p1(input)); // ikerpcty
