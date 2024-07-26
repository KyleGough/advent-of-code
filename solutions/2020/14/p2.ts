import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseInstruction, formatBinary } from './day14.helper';

export const day14p2 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);
  const memory: Record<string, string> = {};
  let mask = '';

  for (const instruction of instructions) {
    if (instruction.type === 'mask') {
      mask = instruction.value;
    } else {
      const { address: addressStr, value } = instruction;
      const valueBinary = formatBinary(value);
      const addressBinary = formatBinary(decimalToBinary(addressStr));
      const maskedAddress = applyMask(addressBinary, mask);
      const floatingAddresses = getAddresses(maskedAddress);

      for (const address of floatingAddresses) {
        memory[address] = valueBinary;
      }
    }
  }

  const decimalValues = Object.values(memory).map((i) => parseInt(i, 2));
  return decimalValues.reduce(sum, 0);
};

const decimalToBinary = (input: string): string => {
  return parseInt(input).toString(2);
};

const getAddresses = (maskedAddress: string): string[] => {
  if (maskedAddress === 'X') {
    return ['0', '1'];
  } else if (maskedAddress.length === 1) {
    return [maskedAddress];
  }

  const head = maskedAddress.charAt(0);
  const tailAddresses = getAddresses(maskedAddress.slice(1));

  if (head === 'X') {
    return tailAddresses.map((i) => [`0${i}`, `1${i}`]).flat();
  } else {
    return tailAddresses.map((i) => `${head}${i}`);
  }
};

const applyMask = (value: string, mask: string): string => {
  return value
    .split('')
    .map((digit, i) =>
      mask.charAt(i) === '0' ? digit : mask.charAt(i) === '1' ? '1' : 'X'
    )
    .join('');
};

const input = getPuzzle(__dirname).input;
run(() => day14p2(input)); // 3415488160714
