import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseTarget, triangleNumber } from './day17.helper';

export const day17p1 = (input: string) => {
  const target = parseTarget(input);
  return triangleNumber(Math.abs(target.minY - 1));
};

const input = getPuzzle(__dirname).input;
run(() => day17p1(input)); // 15931
