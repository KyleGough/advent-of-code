import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getChecksum } from './day16.helper';

export const day16p1 = (input: string) => {
  const diskSize = 272;
  const checksum = getChecksum(input.split(''), diskSize);
  return checksum;
};

const input = getPuzzle(__dirname).input;
run(() => day16p1(input)); // 10100101010101101
