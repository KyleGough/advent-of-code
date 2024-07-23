import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInstruction, simulate } from './day08.helper';

export const day08p1 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);
  return simulate(instructions).acc;
};

const input = getPuzzle(__dirname).input;
run(() => day08p1(input)); // 1749
