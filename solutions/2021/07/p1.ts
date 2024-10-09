import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getCounts } from './day07.helper';

export const day07p1 = (input: string) => {
  const nums = input.split(',').map(Number);
  const counts = getCounts(nums);
  const median = getMedian(nums);
  return getFuelCost(counts, median);
};

const getMedian = (nums: number[]): number => {
  const sortedNums = nums.sort((a, b) => b - a);

  if (sortedNums.length % 2) {
    return sortedNums[(sortedNums.length - 1) / 2];
  } else {
    return (
      (sortedNums[sortedNums.length / 2] +
        sortedNums[sortedNums.length / 2 - 1]) /
      2
    );
  }
};

const getFuelCost = (counts: Record<number, number>, mode: number): number => {
  let total = 0;

  for (const key of Object.keys(counts).map(Number)) {
    total += counts[key] * Math.abs(key - mode);
  }

  return total;
};

const input = getPuzzle(__dirname).input;
run(() => day07p1(input)); // 343605
