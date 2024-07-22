import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { uniqueLetters } from './day06.helper';

export const day06p2 = (input: string) => {
  const groups = input.split('\n\n');
  return groups.map(questionsAnswered).reduce(sum, 0);
};

const intersection = <T>(a: Set<T>, b: Set<T>): Set<T> => {
  return new Set([...a].filter((i) => b.has(i)));
};

const questionsAnswered = (input: string): number => {
  const personAnswers = input.split('\n').map(uniqueLetters);
  let combinedAnswers = personAnswers[0];

  for (const ans of personAnswers) {
    combinedAnswers = intersection(combinedAnswers, ans);
  }

  return combinedAnswers.size;
};

const input = getPuzzle(__dirname).input;
run(() => day06p2(input)); // 3356
