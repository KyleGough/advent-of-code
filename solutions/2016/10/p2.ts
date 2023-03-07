import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { simulate } from './day10.helper';

export const day10p2 = (input: string) => {
  const outputMap = simulate(input).outputMap;
  return outputMap[0] * outputMap[1] * outputMap[2];
};

const input = getPuzzle(__dirname).input;
run(() => day10p2(input)); // 7847
