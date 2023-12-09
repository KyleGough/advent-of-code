import { getPuzzle } from '@utilities/getPuzzle';
import { trueCount } from '@utilities/reduce';
import { run } from '@utilities/run';
import { trianglePossible } from './day03.helper';
import { matchNumbers } from '@utilities/string';

const getLengths = (input: string): number[][] => {
  const lines = input.split('\n');
  const output = [];

  for (let i = 0; i < lines.length; i += 3) {
    const lengths = lines.slice(i, i + 3).map(matchNumbers);
    output.push([lengths[0][0], lengths[1][0], lengths[2][0]]);
    output.push([lengths[0][1], lengths[1][1], lengths[2][1]]);
    output.push([lengths[0][2], lengths[1][2], lengths[2][2]]);
  }

  return output;
};

export const day03p2 = (input: string) => {
  const lengths = getLengths(input);
  return lengths.map(trianglePossible).reduce(trueCount, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day03p2(input)); // 1649
