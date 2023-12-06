import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { matchDisjointNumber } from '@utilities/stringMatch';

export const day06p2 = (input: string) => {
  const [time, distance] = input.split('\n').map(matchDisjointNumber);
  return getWinMethodCount(time, distance);
};

const getWinMethodCount = (time: number, distance: number): number => {
  const discriminant = Math.pow(time, 2) - 4 * distance;
  const n1 = (time - Math.sqrt(discriminant)) / 2;
  const n2 = (time + Math.sqrt(discriminant)) / 2;
  const min = Math.ceil(Math.min(n1, n2));
  const max = Math.floor(Math.max(n1, n2));
  return max - min + 1;
};

const input = getPuzzle(__dirname).input;
run(() => day06p2(input)); // 39132886
