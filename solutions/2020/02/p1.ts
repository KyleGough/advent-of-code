import { getPuzzle } from '@utilities/getPuzzle';
import { trueCount } from '@utilities/reduce';
import { run } from '@utilities/run';
import { Policy, parsePolicy } from './day02.helper';

export const day02p1 = (input: string) => {
  const policies = input.split('\n').map(parsePolicy);
  return policies.map(isValidPassword).reduce(trueCount, 0);
};

const getLetterCount = (input: string, letter: string): number => {
  return input.split('').filter((i) => i === letter).length;
};

const isValidPassword = (policy: Policy): boolean => {
  const criteriaLetters = getLetterCount(policy.password, policy.letter);
  return criteriaLetters >= policy.min && criteriaLetters <= policy.max;
};

const input = getPuzzle(__dirname).input;
run(() => day02p1(input)); // 410
