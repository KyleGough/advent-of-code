import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInput, getElfScore } from './day09.helper';

export const day09p1 = (input: string) => {
  const [playerCount, marbleCount] = parseInput(input);
  return getElfScore(playerCount, marbleCount);
};

const input = getPuzzle(__dirname).input;
run(() => day09p1(input)); // 410375
