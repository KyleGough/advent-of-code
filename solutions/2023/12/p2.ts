import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { combos, parseRow } from './day12.helper';

export const day12p2 = (input: string) => {
  const rows = input.split('\n').map(parseRow);
  let total = 0;

  for (let i = 0; i < rows.length; i++) {
    const springs = [];
    const groups = [];

    for (let n = 0; n < 5; n++) {
      springs.push(rows[i].springs);
      groups.push(...rows[i].groups);
    }

    const c = combos(springs.join('?'), groups, false);
    total += c;
  }

  return total;
};

const input = getPuzzle(__dirname).input;
run(() => day12p2(input)); // 50338344809230
