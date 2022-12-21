import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { mix, getCoordinates } from './day20.helper';

export const day20p1 = (input: string) => {
  let sequence = input.split('\n').map((i) => parseInt(i));
  let indexes = sequence.map((_, i) => i);

  [sequence, indexes] = mix(sequence, indexes);

  return getCoordinates(sequence);
};

const input = getPuzzle(__dirname).input;
run(() => day20p1(input)); // 7584
