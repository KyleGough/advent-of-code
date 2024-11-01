import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { isTractorBeam } from './day19.helper';

export const day19p1 = (input: string) => {
  const nums = input.split(',').map(Number);
  let count = 0;

  for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
      if (isTractorBeam(nums, x, y)) {
        count += 1;
      }
    }
  }

  return count;
};

const input = getPuzzle(__dirname).input;
run(() => day19p1(input)); // 192
