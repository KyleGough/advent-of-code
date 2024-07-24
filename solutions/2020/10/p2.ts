import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getOrderedAdapterSequence } from './day10.helper';

export const day10p2 = (input: string) => {
  const nums = getOrderedAdapterSequence(input);
  let combos = Array(nums.length).fill(0);

  // Penultimate adapter always has one possibility only.
  combos[combos.length - 2] = 1;

  for (let i = combos.length - 3; i >= 0; i--) {
    combos = getComboCount(i, nums.slice(i, i + 4), combos);
  }

  return combos[0];
};

const getComboCount = (
  idx: number,
  nums: number[],
  combos: number[]
): number[] => {
  for (let i = 1; i < nums.length; i++) {
    const diff = nums[i] - nums[0];
    if (diff <= 3) {
      combos[idx] += combos[idx + i];
    }
  }

  return combos;
};

const input = getPuzzle(__dirname).input;
run(() => day10p2(input)); // 442136281481216
