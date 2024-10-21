import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { gravityAssistProgram } from './day02.helper';

export const day02p2 = (input: string) => {
  const originalNums = input.split(',').map(Number);

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const nums = [originalNums[0], noun, verb, ...originalNums.slice(3)];
      const value = gravityAssistProgram(nums);

      if (value === 19_690_720) {
        return noun * 100 + verb;
      }
    }
  }
};

const input = getPuzzle(__dirname).input;
run(() => day02p2(input)); // 5741
