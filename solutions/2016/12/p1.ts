import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInstruction, runAssembunny } from './day12.helper';

export const day12p1 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);
  const register = runAssembunny(instructions, { a: 0, b: 0, c: 0, d: 0 });
  return register['a'];
};

const input = getPuzzle(__dirname).input;
run(() => day12p1(input)); // 317993
