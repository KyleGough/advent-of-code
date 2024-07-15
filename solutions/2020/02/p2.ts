import { getPuzzle } from '@utilities/getPuzzle';
import { trueCount } from '@utilities/reduce';
import { run } from '@utilities/run';
import { Policy, parsePolicy } from './day02.helper';

export const day02p2 = (input: string) => {
  const policies = input.split('\n').map(parsePolicy);
  return policies.map(isValidPassword).reduce(trueCount, 0);
};

const isValidPassword = (policy: Policy): boolean => {
  const first = policy.password.charAt(policy.min - 1) === policy.letter;
  const second = policy.password.charAt(policy.max - 1) === policy.letter;
  return first !== second;
};

const input = getPuzzle(__dirname).input;
run(() => day02p2(input)); // 694
