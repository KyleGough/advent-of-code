import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { convertToRpn, solve } from './day18.helper';

export const day18p1 = (input: string) => {
  const expressions = input.split('\n').map((e) => e.replaceAll(' ', ''));

  return expressions
    .map((e) => convertToRpn(e))
    .map(solve)
    .reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day18p1(input)); // 5019432542701
