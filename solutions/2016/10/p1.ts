import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { simulate } from './day10.helper';

export const day10p1 = (input: string) => {
  return simulate(input).specialBot;
};

const input = getPuzzle(__dirname).input;
run(() => day10p1(input)); // 56
