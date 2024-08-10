import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { convertToRpn, solve } from './day18.helper';

export const day18p2 = (input: string) => {
  const expressions = input.split('\n').map((e) => e.replaceAll(' ', ''));
  const precedence = ['+', '*'];

  return expressions
    .map((e) => convertToRpn(e, precedence))
    .map(solve)
    .reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day18p2(input)); // 70518821989947
