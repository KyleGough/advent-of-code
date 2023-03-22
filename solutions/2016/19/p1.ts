import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

// Based on the Josephus Problem.
export const day19p1 = (input: string) => {
  const n = parseInt(input);
  const maxPower = n.toString(2).length - 1;
  const remainder = n - 2 ** maxPower;
  return 2 * remainder + 1;
};

const input = getPuzzle(__dirname).input;
run(() => day19p1(input)); // 1842613
