import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getCardMatches } from './day04.helper';

export const day04p2 = (input: string) => {
  const matches = input.split('\n').map(getCardMatches);
  let queue = [];
  let totalCardCount = 0;
  const matchMap: Record<string, number> = {};

  for (let k = matches.length - 1; k >= 0; k--) {
    queue = [k];
    let count = 0;

    while (queue.length) {
      const id = queue.shift() as number;
      const matchCount = matches[id];

      count++;

      if (matchCount > 0) {
        for (let i = 0; i < matchCount; i++) {
          if (matchMap[id + i + 1]) {
            count += matchMap[id + i + 1];
          } else if (matches[id + i + 1] > 0) {
            queue.push(id + i + 1);
          } else {
            count++;
          }
        }
      }
    }

    matchMap[k] = count;
    totalCardCount += count;
  }

  return totalCardCount;
};

const input = getPuzzle(__dirname).input;
run(() => day04p2(input)); // 5833065
