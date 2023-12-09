import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day01p2 = (input: string) => {
  const nums = input.split('\n').map((i) => parseInt(i));
  const visited = new Set<number>();
  let i = 0;
  let frequency = 0;

  while (true) {
    frequency += nums[i++ % nums.length];
    if (visited.has(frequency)) {
      return frequency;
    }
    visited.add(frequency);
  }
};

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 66932
