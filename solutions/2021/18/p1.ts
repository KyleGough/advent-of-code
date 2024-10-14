import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { addPairs, getMagnitude, parseFlatPairs } from './day18.helper';

export const day18p1 = (input: string) => {
  const pairs = input.split('\n').map(parseFlatPairs).reduce(addPairs);
  return getMagnitude(pairs);
};

const input = getPuzzle(__dirname).input;
run(() => day18p1(input)); // 4184
