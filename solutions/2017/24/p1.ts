import { getPuzzle } from '@utilities/getPuzzle';
import { max } from '@utilities/reduce';
import { run } from '@utilities/run';
import { buildComponents, branch } from './day24.helper';

export const day24p1 = (input: string) => {
  const components = buildComponents(input);
  const scores = branch('0', components);
  return scores.map((i) => i[0]).reduce(max, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day24p1(input)); // 1511
