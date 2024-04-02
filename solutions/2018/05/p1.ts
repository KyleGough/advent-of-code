import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getReducedPolymerLength } from './day05.helper';

export const day05p1 = (input: string) => {
  return getReducedPolymerLength(input);
};

const input = getPuzzle(__dirname).input;
run(() => day05p1(input)); // 10972
