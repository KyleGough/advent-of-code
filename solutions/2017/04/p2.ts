import { getPuzzle } from '@utilities/getPuzzle';
import { trueCount } from '@utilities/reduce';
import { run } from '@utilities/run';

const sortPhrase = (phrase: string): string => {
  const letters = phrase.split('');
  letters.sort();
  return letters.join('');
};

const isValidPassphrase = (input: string): boolean => {
  const phrases = input.split(' ');
  const anagrams = new Set(phrases.map(sortPhrase));
  return phrases.length === anagrams.size;
};

export const day04p2 = (input: string) => {
  return input.split('\n').map(isValidPassphrase).reduce(trueCount, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day04p2(input)); // 167
