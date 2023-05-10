import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseLayers, getSeverity } from './day13.helper';

export const day13p1 = (input: string) => {
  const layers = parseLayers(input);
  return getSeverity(layers);
};

const input = getPuzzle(__dirname).input;
run(() => day13p1(input)); // 1612
