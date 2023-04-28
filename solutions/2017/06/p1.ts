import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { executeLoop } from './day06.helper';

export const day06p1 = (input: string) => {
  return executeLoop(input.split('\t').map((i) => parseInt(i))).loopSize;
};

const input = getPuzzle(__dirname).input;
run(() => day06p1(input)); // 12841
