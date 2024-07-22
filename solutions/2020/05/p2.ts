import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getSeatId } from './day05.helper';

export const day05p2 = (input: string) => {
  const boardingPasses = input.split('\n');
  const sortedPasses = boardingPasses.map(getSeatId).sort((a, b) => a - b);
  return getOwnSeatId(sortedPasses);
};

const getOwnSeatId = (passes: number[]) => {
  for (let i = 1; i < passes.length - 1; i++) {
    if (passes[i + 1] !== passes[i] + 1) {
      return passes[i] + 1;
    }
  }
};

const input = getPuzzle(__dirname).input;
run(() => day05p2(input)); // 657
