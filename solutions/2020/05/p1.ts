import { getPuzzle } from '@utilities/getPuzzle';
import { max } from '@utilities/reduce';
import { run } from '@utilities/run';
import { getSeatId } from './day05.helper';

export const day05p1 = (input: string) => {
  const boardingPasses = input.split('\n');
  return boardingPasses.map(getSeatId).reduce(max, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day05p1(input)); // 926
