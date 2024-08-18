import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { moveCups } from './day23.helper';

export const day23p1 = (input: string) => {
  const values = input.split('').map(Number);
  const cups = moveCups(values, 100);

  const sequence: number[] = [];

  let current = cups[1];

  while (current !== 1) {
    sequence.push(current);
    current = cups[current];
  }

  return sequence.join('');
};

const input = getPuzzle(__dirname).input;
run(() => day23p1(input)); // 97342568
