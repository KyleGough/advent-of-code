import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseDisc, getTimeForCapsule } from './day15.helper';

export const day15p2 = (input: string) => {
  const discs = input.split('\n').map(parseDisc);
  discs.push({ positions: 11, currPosition: 0 });
  return getTimeForCapsule(discs);
};

const input = getPuzzle(__dirname).input;
run(() => day15p2(input)); // 3903937
