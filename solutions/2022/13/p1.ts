import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { compareList } from './day13.helper';

const getPairs = (pairs: string) => {
  return pairs.split('\n').map((i) => JSON.parse(i));
};

export const day13p1 = (input: string) => {
  const pairs = input.split('\n\n');
  let packetSum = 0;

  for (let i = 0; i < pairs.length; i++) {
    const [left, right] = getPairs(pairs[i]);
    const outcome = compareList(left, right);
    if (outcome === -1) {
      packetSum += i + 1;
    }
  }

  return packetSum;
};

const input = getPuzzle(__dirname).input;
run(() => day13p1(input)); // 6568
