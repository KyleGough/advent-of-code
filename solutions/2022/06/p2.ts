import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getStartMarkerIndex } from './day06.helper';

export const day06p2 = (input: string) => {
  return getStartMarkerIndex(input, 14);
};

const input = getPuzzle(__dirname).input;
run(() => day06p2(input)); // 2202
