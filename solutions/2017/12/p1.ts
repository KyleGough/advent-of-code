import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parsePipeNetwork, getGroup } from './day12.helper';

export const day12p1 = (input: string) => {
  const pipes = parsePipeNetwork(input);
  return getGroup(pipes, 0).size;
};

const input = getPuzzle(__dirname).input;
run(() => day12p1(input)); // 134
