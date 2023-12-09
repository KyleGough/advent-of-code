import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { matchNumbers } from '@utilities/string';
import { getWinMethodCount } from './day06.helper';

export const day06p1 = (input: string) => {
  const [times, distances] = input.split('\n').map(matchNumbers);
  let product = 1;

  for (let i = 0; i < times.length; i++) {
    product *= getWinMethodCount(times[i], distances[i]);
  }

  return product;
};

const input = getPuzzle(__dirname).example;
run(() => day06p1(input)); // 2374848
