import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { simulatePyroclasticFlow } from './day17.helper';

const numRocks = 2022;

export const day17p1 = (input: string) => {
  const jet = input.split('');
  const gridHeights = simulatePyroclasticFlow(numRocks, jet);
  return gridHeights[gridHeights.length - 1];
};

const input = getPuzzle(__dirname).input;
run(() => day17p1(input)); // 3217
