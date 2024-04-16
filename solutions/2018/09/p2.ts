import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInput, getElfScore } from './day09.helper';

export const day09p2 = (input: string) => {
  const [playerCount, marbleCount] = parseInput(input);
  return getElfScore(playerCount, marbleCount * 100);
};

const input = getPuzzle(__dirname).input;
run(() => day09p2(input)); // 3314195047
