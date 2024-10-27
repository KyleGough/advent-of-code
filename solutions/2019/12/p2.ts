import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { lcm } from '@utilities/math';
import { Moon, parseMoon, runTimestep } from './day12.helper';

export const day12p2 = (input: string) => {
  const moons = input.split('\n').map(parseMoon);
  return getCycleLength(moons);
};

const getAxisHash = (moons: Moon[], axis: number): string => {
  return moons
    .map((moon) => [moon.pos[axis], moon.vel[axis]])
    .flat()
    .join(',');
};

interface Cycle {
  history: Set<string>;
  found: boolean;
  length: number;
}

const initialiseCycle = (moons: Moon[], axis: number): Cycle => {
  return {
    history: new Set<string>([getAxisHash(moons, axis)]),
    found: false,
    length: 0,
  };
};

const getCycleLength = (moons: Moon[]) => {
  const cycles: Cycle[] = [];

  for (let i = 0; i < 3; i++) {
    cycles.push(initialiseCycle(moons, i));
  }

  let step = 0;

  while (cycles.filter((c) => c.found).length < 3) {
    step += 1;
    runTimestep(moons);

    for (let axis = 0; axis < 3; axis++) {
      const hash = getAxisHash(moons, axis);
      const cycle = cycles[axis];

      if (!cycle.found && cycle.history.has(hash)) {
        cycle.found = true;
        cycle.length = step;
      } else {
        cycle.history.add(hash);
      }
    }
  }

  return cycles.map((c) => c.length).reduce(lcm, 1);
};

const input = getPuzzle(__dirname).input;
run(() => day12p2(input)); // 326365108375488
