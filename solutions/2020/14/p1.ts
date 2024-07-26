import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseInstruction, formatBinary } from './day14.helper';

export const day14p1 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);
  const memory: Record<string, string> = {};
  let mask = '';

  for (const instruction of instructions) {
    if (instruction.type === 'mask') {
      mask = instruction.value;
    } else {
      const { address, value } = instruction;
      const valueBinary = formatBinary(value);
      memory[address] = applyMask(valueBinary, mask);
    }
  }

  const decimalValues = Object.values(memory).map((i) => parseInt(i, 2));
  return decimalValues.reduce(sum, 0);
};

const applyMask = (value: string, mask: string): string => {
  return value
    .split('')
    .map((digit, i) => (mask.charAt(i) === 'X' ? digit : mask.charAt(i)))
    .join('');
};

const input = getPuzzle(__dirname).input;
run(() => day14p1(input)); // 14954914379452
