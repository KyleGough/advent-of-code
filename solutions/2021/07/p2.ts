import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getCounts } from './day07.helper';
import { sum } from '@utilities/reduce';

export const day07p2 = (input: string) => {
  const nums = input.split(',').map(Number);
  const counts = getCounts(nums);
  const mean = getMean(nums);

  if (Number.isInteger(mean)) {
    return getFuelCost(counts, mean);
  } else {
    return Math.min(
      getFuelCost(counts, Math.floor(mean)),
      getFuelCost(counts, Math.ceil(mean))
    );
  }
};

const getMean = (nums: number[]): number => {
  return nums.reduce(sum, 0) / nums.length;
};

const getFuelCost = (counts: Record<number, number>, mode: number): number => {
  let total = 0;

  for (const key of Object.keys(counts).map(Number)) {
    const distance = Math.abs(key - mode);
    const fuelCost = (distance * (distance + 1)) / 2;
    total += counts[key] * fuelCost;
  }

  return total;
};

const input = getPuzzle(__dirname).input;
run(() => day07p2(input)); // 96744904
