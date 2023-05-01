import { getPuzzle } from '@utilities/getPuzzle';
import { max } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseInstruction, executeInstruction } from './day08.helper';

const maxRegisterValue = (registers: Record<string, number>): number => {
  return Object.values(registers).reduce(max, 0);
};

export const day08p2 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);
  const registers: Record<string, number> = {};
  let max = 0;

  for (const instruction of instructions) {
    executeInstruction(registers, instruction);
    const cycleMax = maxRegisterValue(registers);
    if (cycleMax > max) {
      max = cycleMax;
    }
  }

  return max;
};

const input = getPuzzle(__dirname).input;
run(() => day08p2(input)); // 7774
