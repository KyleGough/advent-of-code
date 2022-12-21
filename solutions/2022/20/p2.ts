import { getPuzzle } from '@utilities/getPuzzle';
import { mix, getCoordinates } from './day20.helper';
import { run } from '@utilities/run';

const decryptionKey = 811_589_153;

export const day20p2 = (input: string) => {
  let sequence = input.split('\n').map((i) => parseInt(i) * decryptionKey);
  let indexes = sequence.map((_, i) => i);

  for (let k = 0; k < 10; k++) {
    [sequence, indexes] = mix(sequence, indexes);
  }

  return getCoordinates(sequence);
};

const input = getPuzzle(__dirname).input;
run(() => day20p2(input)); // 4907679608191
