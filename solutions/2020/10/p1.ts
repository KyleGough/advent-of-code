import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getOrderedAdapterSequence } from './day10.helper';

export const day10p1 = (input: string) => {
  const nums = getOrderedAdapterSequence(input);
  let oneDiffCount = 0;
  let threeDiffCount = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = 1; j <= 3; j++) {
      const diff = nums[i + j] - nums[i];
      if (diff === 3) {
        threeDiffCount += 1;
        break;
      } else if (diff === 1) {
        oneDiffCount += 1;
        break;
      }
    }
  }

  return oneDiffCount * threeDiffCount;
};

const input = getPuzzle(__dirname).input;
run(() => day10p1(input)); // 2475
