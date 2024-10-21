import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { getFuelCost } from './day01.helper';

export const day01p1 = (input: string) => {
  const masses = input.split('\n').map(Number);
  const fuels = masses.map(getFuelCost);
  return fuels.reduce(sum, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day01p1(input)); // 3224048
