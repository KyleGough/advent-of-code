import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseDisc, getTimeForCapsule } from './day15.helper';

export const day15p1 = (input: string) => {
  const discs = input.split('\n').map(parseDisc);
  return getTimeForCapsule(discs);
};

const input = getPuzzle(__dirname).input;
run(() => day15p1(input)); // 376777
