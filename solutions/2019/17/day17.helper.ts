import { intcodeComputerStep, StepOutput } from '../05/day05.helper';

export const getScaffolding = (nums: number[]): string => {
  let step: StepOutput = { ip: 0, base: 0, halt: false, output: 0 };
  const output = [];

  while (!step.halt) {
    step = intcodeComputerStep(nums, [], step.ip, step.base);
    output.push(String.fromCharCode(step.output));
  }

  return output.join('');
};
