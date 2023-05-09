import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parsePipeNetwork, getGroup } from './day12.helper';

export const day12p2 = (input: string) => {
  const pipes = parsePipeNetwork(input);
  let pipeCount = Object.keys(pipes).length;
  let groupCount = 0;

  while (pipeCount) {
    const startId = parseInt(Object.keys(pipes)[0]);
    const group = getGroup(pipes, startId);

    for (const removeId of [...group]) {
      delete pipes[removeId];
    }

    pipeCount = Object.keys(pipes).length;
    groupCount++;
  }

  return groupCount;
};

const input = getPuzzle(__dirname).input;
run(() => day12p2(input)); // 193
