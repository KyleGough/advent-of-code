import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { TubeNetwork } from './day19.helper';

export const day19p1 = (input: string) => {
  const grid = input.split('\n').map((i) => i.split(''));
  const tubeNetwork = new TubeNetwork(grid);
  tubeNetwork.traversePacket();
  return tubeNetwork.letterOrder.join('');
};

const input = getPuzzle(__dirname).input;
run(() => day19p1(input)); // VTWBPYAQFU
