import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseIPRange } from './day20.helper';

export const day20p1 = (input: string) => {
  const blockedRanges = input.split('\n').map(parseIPRange);
  let foundMinIp = false;
  let currIp = 0;

  while (!foundMinIp) {
    let isBlockedIp = false;
    for (let i = 0; i < blockedRanges.length; i++) {
      const [min, max] = blockedRanges[i];
      if (currIp >= min && currIp <= max) {
        currIp = max + 1;
        isBlockedIp = true;
        break;
      }
    }

    if (!isBlockedIp) {
      foundMinIp = true;
    }
  }

  return currIp;
};

const input = getPuzzle(__dirname).input;
run(() => day20p1(input)); // 14975795
