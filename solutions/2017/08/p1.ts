import { getPuzzle } from '@utilities/getPuzzle';
import { max } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseInstruction, executeInstruction } from './day08.helper';

export const day08p1 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);
  const registers: Record<string, number> = {};

  for (const instruction of instructions) {
    executeInstruction(registers, instruction);
  }

  return Object.values(registers).reduce(max, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day08p1(input)); // 4888
