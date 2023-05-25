import { getPuzzle } from '@utilities/getPuzzle';
import { max } from '@utilities/reduce';
import { run } from '@utilities/run';
import { buildComponents, branch } from './day24.helper';

export const day24p2 = (input: string) => {
  const components = buildComponents(input);
  const scores = branch('0', components);
  const maxLength = scores.map((i) => i[1]).reduce(max, 0);
  return scores
    .filter((i) => i[1] === maxLength)
    .map((i) => i[0])
    .reduce(max, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day24p2(input)); //
