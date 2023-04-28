import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { executeLoop } from './day06.helper';

export const day06p2 = (input: string) => {
  const { banks } = executeLoop(input.split('\t').map((i) => parseInt(i)));
  return executeLoop(banks).loopSize;
};

const input = getPuzzle(__dirname).input;
run(() => day06p2(input)); // 8038
