import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { countLetters } from '@utilities/string';

export const day02p1 = (input: string) => {
  const counts = input.split('\n').map(countLetters);
  const doubleCount = counts.filter((i) => containsDuplicate(i, 2)).length;
  const tripleCount = counts.filter((i) => containsDuplicate(i, 3)).length;
  return doubleCount * tripleCount;
};

const containsDuplicate = (
  counts: Record<string, number>,
  n: number
): boolean => {
  return Object.values(counts).indexOf(n) > -1;
};

const input = getPuzzle(__dirname).input;
run(() => day02p1(input)); // 7350
