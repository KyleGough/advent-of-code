import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { uniqueLetters } from './day06.helper';

export const day06p1 = (input: string) => {
  const groups = input.split('\n\n');
  return groups.map(questionsAnswered).reduce(sum, 0);
};

const questionsAnswered = (input: string): number => {
  return uniqueLetters(input).size;
};

const input = getPuzzle(__dirname).input;
run(() => day06p1(input)); // 6775
