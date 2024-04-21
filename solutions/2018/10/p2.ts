import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseParticle, getMessageSteps } from './day10.helper';

export const day10p2 = (input: string) => {
  const particles = input.split('\n').map(parseParticle);
  return getMessageSteps(particles);
};

const input = getPuzzle(__dirname).input;
run(() => day10p2(input)); // 10144
