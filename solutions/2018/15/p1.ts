import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { simulateCombat } from './day15.helper';

export const day15p1 = (input: string) => {
  return simulateCombat(input);
};

const input = getPuzzle(__dirname).input;
run(() => day15p1(input)); // 214731
