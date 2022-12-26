import { getPuzzle } from '@utilities/getPuzzle';
import { compareList } from './day13.helper';
import { run } from '@utilities/run';

export const day13p2 = (input: string) => {
  const packets = input
    .split('\n')
    .filter((i) => i !== '')
    .map((i) => JSON.parse(i));
  packets.push([[2]]);
  packets.push([[6]]);

  packets.sort(compareList);

  let firstMarkerIndex = 0;
  let secondMarkerIndex = 0;

  for (let i = 0; i < packets.length; i++) {
    if (JSON.stringify(packets[i]) === JSON.stringify([[2]])) {
      firstMarkerIndex = i + 1;
    } else if (JSON.stringify(packets[i]) === JSON.stringify([[6]])) {
      secondMarkerIndex = i + 1;
    }
  }

  return firstMarkerIndex * secondMarkerIndex;
};

const input = getPuzzle(__dirname).input;
run(() => day13p2(input)); // 19493
