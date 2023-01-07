import { getPuzzle } from '@utilities/getPuzzle';
import { trueCount } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseLength, trianglePossible } from './day03.helper';

export const day03p1 = (input: string) => {
  const lengths = input.split('\n').map(parseLength);
  return lengths.map((i) => trianglePossible(i)).reduce(trueCount, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day03p1(input)); // 917
