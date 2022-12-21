import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day20p1 = (input: string) => {
  const presentAmount = parseInt(input) / 10;
  const presentCounts = Array(presentAmount).fill(0);
  let minHouseNumber = presentAmount;

  for (let i = 1; i < presentAmount; i++) {
    for (let j = i; j < presentAmount; j += i) {
      presentCounts[j] += i;
      if (presentCounts[j] > presentAmount && j < minHouseNumber) {
        minHouseNumber = j;
      }
    }
  }

  return minHouseNumber;
};

const input = getPuzzle(__dirname).input;
run(() => day20p1(input)); // 831600
