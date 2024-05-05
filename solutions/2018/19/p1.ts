import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { performOperation } from '../16/day16.helper';
import { getInstructionPointerIndex, parseInstruction } from './day19.helper';

export const day19p1 = (input: string) => {
  let registers = [0, 0, 0, 0, 0, 0];
  const lines = input.split('\n');
  const ipIndex = getInstructionPointerIndex(lines[0]);
  const instructions = lines.slice(1).map(parseInstruction);

  while (registers[ipIndex] >= 0 && registers[ipIndex] < instructions.length) {
    const ip = registers[ipIndex];
    const { op, a, b, c } = instructions[ip];
    registers = performOperation(op, { a, b, c, before: registers });
    registers[ipIndex] += 1;
  }

  return registers[0];
};

const input = getPuzzle(__dirname).input;
run(() => day19p1(input)); // 1620
