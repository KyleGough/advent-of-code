import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { sum } from '@utilities/reduce';
import { getFuelCost } from './day01.helper';

export const day01p2 = (input: string) => {
  const masses = input.split('\n').map(Number);
  const fuels = masses.map(getTotalCost);
  return fuels.reduce(sum, 0);
};

const getTotalCost = (mass: number): number => {
  let total = 0;

  while (mass > 0) {
    mass = getFuelCost(mass);
    total += mass;
  }

  return total;
};

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 4833211
