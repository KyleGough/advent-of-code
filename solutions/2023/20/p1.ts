import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  constructModules,
  getConjuctionPulses,
  getFlipFlopPulses,
  getInitialPulses,
  Pulse,
} from './day20.helper';

export const day20p1 = (input: string) => {
  const [modules, broadcast] = constructModules(input);

  let lowCount = 0;
  let highCount = 0;

  for (let i = 0; i < 1000; i++) {
    const queue = getInitialPulses(broadcast);
    lowCount += 1;

    while (queue.length) {
      const { start, signal, target } = queue.shift() as Pulse;

      if (signal === 'LOW') {
        lowCount += 1;
      } else {
        highCount += 1;
      }

      if (!modules[target]) {
        continue;
      }

      const targetModule = modules[target];
      let pulses;

      if (targetModule.type === '%') {
        pulses = getFlipFlopPulses(targetModule, signal);
      } else {
        pulses = getConjuctionPulses(targetModule, start, signal);
      }

      queue.push(...pulses);
    }
  }

  return lowCount * highCount;
};

const input = getPuzzle(__dirname).input;
run(() => day20p1(input)); // 869395600
