import { getPuzzle } from '@utilities/getPuzzle';
import { max, min } from '@utilities/reduce';
import { run } from '@utilities/run';
import { moveCups, parseCups } from './day23.helper';

export const day23p1 = (input: string) => {
  const values = input.split('').map(Number);
  const minValue = values.reduce(min, Number.MAX_SAFE_INTEGER);
  const maxValue = values.reduce(max, 0);

  const cups = parseCups(values);
  let current = moveCups(cups, 100, minValue, maxValue);

  const sequence: number[] = [];

  do {
    sequence.push(current.value);
    current = current.next;
  } while (current.value !== 1);

  return sequence.slice(1).join('');
};

const input = getPuzzle(__dirname).input;
run(() => day23p1(input)); // 97342568
