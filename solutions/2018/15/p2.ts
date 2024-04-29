import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { simulateCombat } from './day15.helper';

export const day15p2 = (input: string) => {
  let elfVictory: boolean | number;
  let elfPower = 3;

  do {
    elfVictory = simulateCombat(input, elfPower++, true);
  } while (!elfVictory);

  return elfVictory;
};

const input = getPuzzle(__dirname).input;
run(() => day15p2(input)); // 53222
