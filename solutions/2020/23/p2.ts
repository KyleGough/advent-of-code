import { getPuzzle } from '@utilities/getPuzzle';
import { max } from '@utilities/reduce';
import { run } from '@utilities/run';
import { moveCups } from './day23.helper';

export const day23p2 = (input: string) => {
  const values = input.split('').map(Number);
  const maxValue = values.reduce(max, 0);

  const extension = Array.from(
    { length: 1_000_000 - maxValue },
    (_, i) => i + maxValue + 1
  );

  const cups = moveCups([...values, ...extension], 10_000_000);
  return cups[1] * cups[cups[1]];
};

const input = getPuzzle(__dirname).input;
run(() => day23p2(input)); // 902208073192
