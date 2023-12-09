import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { matchDisjointNumber } from '@utilities/string';
import { getWinMethodCount } from './day06.helper';

export const day06p2 = (input: string) => {
  const [time, distance] = input.split('\n').map(matchDisjointNumber);
  return getWinMethodCount(time, distance);
};

const input = getPuzzle(__dirname).input;
run(() => day06p2(input)); // 39132886
