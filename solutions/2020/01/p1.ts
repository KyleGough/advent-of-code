import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day01p1 = (input: string) => {
  const nums = input.split('\n').map(Number);

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === 2020) {
        return nums[i] * nums[j];
      }
    }
  }

  return;
};

const input = getPuzzle(__dirname).input;
run(() => day01p1(input)); // 1016131
