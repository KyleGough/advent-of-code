import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day01p2 = (input: string) => {
  const nums = input.split('\n').map(Number);

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++)
        if (nums[i] + nums[j] + nums[k] === 2020) {
          return nums[i] * nums[j] * nums[k];
        }
    }
  }

  return;
};

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 276432018
