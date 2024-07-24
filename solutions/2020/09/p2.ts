import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customConfig } from './customConfig';
import { getInvalidNum } from './day09.helper';
import { max, min } from '@utilities/reduce';

export const day09p2 = (input: string, preamble: number) => {
  const nums = input.split('\n').map(Number);
  const invalidNum = getInvalidNum(nums, preamble);

  for (let startNum = 0; startNum < nums.length - 1; startNum++) {
    let listSum = nums[startNum];

    for (let endNum = startNum + 1; endNum < nums.length; endNum++) {
      listSum += nums[endNum];

      if (listSum === invalidNum) {
        const list = nums.slice(startNum, endNum + 1);
        const minValue = list.reduce(min, Number.MAX_VALUE);
        const maxValue = list.reduce(max, 0);
        return minValue + maxValue;
      } else if (listSum > invalidNum) {
        break;
      }
    }
  }
};

const input = getPuzzleWithConfig(__dirname, customConfig).input;
run(() => day09p2(...input)); // 137394018
