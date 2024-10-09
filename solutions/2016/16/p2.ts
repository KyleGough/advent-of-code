import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getChecksum } from './day16.helper';

export const day16p2 = (input: string) => {
  const diskSize = 35_651_584;
  const checksum = getChecksum(input.split(''), diskSize);
  return checksum;
};

const input = getPuzzle(__dirname).input;
run(() => day16p2(input)); // 01100001101101001
