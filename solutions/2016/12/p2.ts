import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInstruction, runAssembunny } from './day12.helper';

export const day12p2 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);
  const register = runAssembunny(instructions, { a: 0, b: 0, c: 1, d: 0 });
  return register['a'];
};

const input = getPuzzle(__dirname).input;
run(() => day12p2(input)); // 9227647
