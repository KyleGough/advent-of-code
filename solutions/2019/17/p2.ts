import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { intcodeComputer } from '../05/day05.helper';

export const day17p2 = (input: string) => {
  const nums = input.split(',').map(Number);

  // Full movement sequence, through manually looking at intcode output from part 1.
  // R4L10L10L8R12R10R4R4L10L10L8R12R10R4R4L10L10L8L8R10R4L8R12R10R4L8L8R10R4R4L10L10L8L8R10R4

  const mainSequence = 'B,C,B,C,B,A,C,A,B,A';
  const functionA = 'L,8,L,8,R,10,R,4';
  const functionB = 'R,4,L,10,L,10';
  const functionC = 'L,8,R,12,R,10,R,4';

  const combinedInput = [
    mainSequence,
    functionA,
    functionB,
    functionC,
    'n',
    '',
  ].join('\n');

  const asciiInput = convertToAscii(combinedInput);

  return intcodeComputer([2, ...nums.slice(1)], asciiInput);
};

const convertToAscii = (input: string): number[] => {
  return input.split('').map((char) => char.charCodeAt(0));
};

const input = getPuzzle(__dirname).input;
run(() => day17p2(input)); // 807320
