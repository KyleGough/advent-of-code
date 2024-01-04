import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  constructModules,
  getConjuctionPulses,
  getFlipFlopPulses,
  getInitialPulses,
  Pulse,
} from './day20.helper';

export const day20p2 = (input: string) => {
  const [modules, broadcast] = constructModules(input);

  const moduleList = Object.values(modules);
  const [feed] = moduleList.filter((i) => i.outputs.includes('rx'));
  const feedOrigins = moduleList.filter((i) => i.outputs.includes(feed.name));

  const cycles: Record<string, number> = {};

  const seen: Record<string, number> = feedOrigins.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.name]: 0,
    };
  }, {});

  let buttonPresses = 0;

  while (true) {
    buttonPresses += 1;

    const queue = getInitialPulses(broadcast);

    while (queue.length) {
      const { start, signal, target } = queue.shift() as Pulse;

      if (!modules[target]) {
        continue;
      }

      const targetModule = modules[target];
      let pulses;

      if (targetModule.name === feed.name && signal === 'HIGH') {
        seen[start] += 1;

        if (!cycles[start]) {
          cycles[start] = buttonPresses;
        }

        const allSeen = Object.values(seen).filter((i) => i < 1).length === 0;
        if (allSeen) {
          return Object.values(cycles).reduce(lcm, 1);
        }
      }

      if (targetModule.type === '%') {
        pulses = getFlipFlopPulses(targetModule, signal);
      } else {
        pulses = getConjuctionPulses(targetModule, start, signal);
      }

      queue.push(...pulses);
    }
  }
};

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

const input = getPuzzle(__dirname).input;
run(() => day20p2(input)); // 232605773145467
