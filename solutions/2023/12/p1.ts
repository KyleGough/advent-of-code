import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { combos, parseRow } from './day12.helper';

export const day12p1 = (input: string) => {
  const rows = input.split('\n').map(parseRow);
  const comboCounts = rows.map((i) => combos(i.springs, i.groups, false));
  return comboCounts.reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day12p1(input)); // 7705
