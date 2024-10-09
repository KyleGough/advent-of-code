import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseDisplay } from './day08.helper';

export const day08p1 = (input: string) => {
  const lines = input.split('\n');
  const outputs = lines.map((line) => parseDisplay(line)[1]).flat();
  return outputs.filter((o) => [2, 3, 4, 7].includes(o.length)).length;
};

const input = getPuzzle(__dirname).input;
run(() => day08p1(input)); // 543
