import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { getCardMatches } from './day04.helper';

export const day04p1 = (input: string) => {
  return input.split('\n').map(getCardMatches).map(getMatchScore).reduce(sum);
};

const getMatchScore = (matches: number): number => {
  return matches === 0 ? 0 : Math.pow(2, matches - 1);
};

const input = getPuzzle(__dirname).input;
run(() => day04p1(input)); // 20667
