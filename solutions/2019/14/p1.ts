import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getOreCount, parseReactions } from './day14.helper';

export const day14p1 = (input: string) => {
  const reactions = parseReactions(input);
  return getOreCount(reactions);
};

const input = getPuzzle(__dirname).input;
run(() => day14p1(input)); // 397771
