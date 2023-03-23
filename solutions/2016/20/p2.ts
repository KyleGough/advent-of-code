import { getPuzzle } from '@utilities/getPuzzle';
import { max } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseIPRange } from './day20.helper';

export const day20p2 = (input: string) => {
  const maxIp = 4_294_967_295;
  const blockedRanges = input.split('\n').map(parseIPRange);
  const maxBlockIp = blockedRanges.map((i) => i[1]).reduce(max);
  let currIp = 0;
  let allowedIpCount = 0;

  while (currIp < maxBlockIp) {
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
      allowedIpCount++;
      currIp++;
    }
  }

  return allowedIpCount + (maxIp - maxBlockIp);
};

const input = getPuzzle(__dirname).input;
run(() => day20p2(input)); // 101
