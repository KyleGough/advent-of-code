import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { TubeNetwork } from './day19.helper';

export const day19p2 = (input: string) => {
  const grid = input.split('\n').map((i) => i.split(''));
  const tubeNetwork = new TubeNetwork(grid);
  tubeNetwork.traversePacket();
  return tubeNetwork.steps;
};

const input = getPuzzle(__dirname).input;
run(() => day19p2(input)); // 17358
