import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { countTiles, traceBeam, Vec } from './day16.helper';

export const day16p1 = (input: string) => {
  const grid = input.split('\n').map((row) => row.split(''));
  const excitedTiles = traceBeam(new Vec(-1, 0), new Vec(1, 0), grid);
  return countTiles(excitedTiles);
};

const input = getPuzzle(__dirname).input;
run(() => day16p1(input)); // 7210
