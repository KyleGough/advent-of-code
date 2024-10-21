import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customConfig } from './customConfig';
import { gravityAssistProgram } from './day02.helper';

export const day02p1 = (input: string, restoreGravityAssist: boolean) => {
  const nums = input.split(',').map(Number);

  if (restoreGravityAssist) {
    nums[1] = 12;
    nums[2] = 2;
  }

  return gravityAssistProgram(nums);
};

const input = getPuzzleWithConfig(__dirname, customConfig).input;
run(() => day02p1(...input)); // 5290681
