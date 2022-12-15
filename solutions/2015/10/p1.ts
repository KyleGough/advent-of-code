import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { lookAndSay } from './day10.helper';

export const day10p1 = (input: string) => {
  let result = input;
  for (let i = 0; i < 40; i++) {
    result = lookAndSay(result);
  }

  return result.length;
};

const input = getPuzzle(__dirname).input;
run(() => day10p1(input)); // 492982
