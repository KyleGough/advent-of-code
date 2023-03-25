import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseNode, getViablePairs } from './day22.helper';

export const day22p1 = (input: string) => {
  const nodes = input.split('\n').slice(2).map(parseNode);
  const viablePairs = getViablePairs(nodes);
  return viablePairs.size;
};

const input = getPuzzle(__dirname).input;
run(() => day22p1(input)); // 892
