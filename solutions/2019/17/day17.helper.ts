import { Intcode } from '../05/day05.helper';

export const getScaffolding = (nums: number[]): string => {
  const program = new Intcode(nums);
  const output = [];

  while (!program.halt) {
    output.push(String.fromCharCode(program.awaitOutput([])));
  }

  return output.join('');
};
