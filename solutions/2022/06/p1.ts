import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getStartMarkerIndex } from './day06.helper';

export const day06p1 = (input: string) => {
  return getStartMarkerIndex(input, 4);
};

const input = getPuzzle(__dirname).input;
run(() => day06p1(input)); // 1876
