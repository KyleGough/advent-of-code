import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInstruction, runAssembunny } from './day23.helper';

export const day23p2 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);
  const register = runAssembunny(instructions, { a: 12, b: 0, c: 0, d: 0 });
  return register['a'];
};

const input = getPuzzle(__dirname).input;
run(() => day23p2(input)); // 479007680
