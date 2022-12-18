import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customConfig } from './customConfig';
import { getCombinationCount } from './day17.helper';

export const day17p1 = (input: string, capacity: number) => {
  const containers = input
    .split('\n')
    .map((i) => parseInt(i))
    .sort((a, b) => b - a);

  return getCombinationCount(containers, capacity).count;
};

const input = getPuzzleWithConfig(__dirname, customConfig).input;
run(() => day17p1(...input)); // 1304
