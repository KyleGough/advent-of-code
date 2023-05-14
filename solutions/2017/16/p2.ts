import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { dance } from './day16.helper';

export const day16p2 = (input: string) => {
  const moves = input.split(',');
  let dancers = dance(moves, 'abcdefghijklmnop'.split(''));
  const dancersMatch = dancers.join('');
  let cycleLength = 0;

  do {
    dancers = dance(moves, dancers);
    cycleLength++;
  } while (dancers.join('') !== dancersMatch);

  const cycleCount = Math.floor(
    (1_000_000_000 - 1 - cycleLength) / cycleLength
  );
  const remainingCycles =
    1_000_000_000 - cycleLength - 1 - cycleCount * cycleLength;

  for (let i = 0; i < remainingCycles; i++) {
    dancers = dance(moves, dancers);
  }

  return dancers.join('');
};

const input = getPuzzle(__dirname).input;
run(() => day16p2(input)); // lgmkacfjbopednhi
