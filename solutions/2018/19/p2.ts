import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { performOperation } from '../16/day16.helper';
import { getInstructionPointerIndex, parseInstruction } from './day19.helper';
import { max } from '@utilities/reduce';

export const day19p2 = (input: string) => {
  let registers = [1, 0, 0, 0, 0, 0];
  const lines = input.split('\n');
  const ipIndex = getInstructionPointerIndex(lines[0]);
  const instructions = lines.slice(1).map(parseInstruction);

  for (let i = 0; i < 1000; i++) {
    const ip = registers[ipIndex];
    const { op, a, b, c } = instructions[ip];
    registers = performOperation(op, { a, b, c, before: registers });
    registers[ipIndex] += 1;
  }

  let total = 0;
  const maxRegister = registers.reduce(max, 0);

  for (let i = 1; i <= maxRegister; i++) {
    if (maxRegister % i === 0) {
      total += i;
    }
  }

  return total;
};

const input = getPuzzle(__dirname).input;
run(() => day19p2(input)); // 15827082
