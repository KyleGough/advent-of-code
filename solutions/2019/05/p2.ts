import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Intcode } from './day05.helper';

export const day05p2 = (input: string) => {
  const nums = input.split(',').map(Number);
  return new Intcode(nums).runProgram([5]);
};

const input = getPuzzle(__dirname).input;
run(() => day05p2(input)); // 7616021
