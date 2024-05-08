import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { performOperation } from '../16/day16.helper';
import {
  getInstructionPointerIndex,
  parseInstruction,
} from '../19/day19.helper';

export const day21p1 = (input: string) => {
  const lines = input.split('\n');
  const ipIndex = getInstructionPointerIndex(lines[0]);
  const instructions = lines.slice(1).map(parseInstruction);

  // Find register to check after running program.
  let check = 0;
  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i].op === 'eqrr') {
      check = instructions[i].a;
    }
  }

  let registers = [0, 0, 0, 0, 0, 0];

  // Run program until encountering "eqrr" instruction.
  while (registers[ipIndex] < instructions.length) {
    const { op, a, b, c } = instructions[registers[ipIndex]];
    if (registers[ipIndex] === 30) {
      break;
    }
    registers = performOperation(op, { a, b, c, before: registers });
    registers[ipIndex] += 1;
  }

  return registers[check];
};

const input = getPuzzle(__dirname).input;
run(() => day21p1(input)); // 6778585
