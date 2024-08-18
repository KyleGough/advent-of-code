import { getPuzzle } from '@utilities/getPuzzle';
import { max, min } from '@utilities/reduce';
import { run } from '@utilities/run';
import { moveCups, parseCups } from './day23.helper';

export const day23p2 = (input: string) => {
  const values = input.split('').map(Number);
  const minValue = values.reduce(min, Number.MAX_SAFE_INTEGER);
  const maxValue = values.reduce(max, 0);

  const extension = Array.from(
    { length: 1_000_000 - maxValue },
    (_, i) => i + maxValue + 1
  );

  const cups = parseCups(values, extension);
  const current = moveCups(cups, 10_000_000, minValue, 1_000_000);
  return current.next.value * current.next.next.value;
};

const input = getPuzzle(__dirname).input;
run(() => day23p2(input)); // 902208073192
