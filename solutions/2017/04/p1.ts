import { getPuzzle } from '@utilities/getPuzzle';
import { trueCount } from '@utilities/reduce';
import { run } from '@utilities/run';

const isValidPassphrase = (input: string): boolean => {
  const phrases = input.split(' ');
  return phrases.length === new Set(phrases).size;
};

export const day04p1 = (input: string) => {
  return input.split('\n').map(isValidPassphrase).reduce(trueCount, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day04p1(input)); // 477
