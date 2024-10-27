import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { customConfig } from './customConfig';
import { parseMoon, runTimestep } from './day12.helper';

export const day12p1 = (input: string, steps: number) => {
  const moons = input.split('\n').map(parseMoon);

  for (let step = 0; step < steps; step++) {
    runTimestep(moons);
  }

  return moons.map((m) => m.getTotalEnergy()).reduce(sum, 0);
};

const input = getPuzzleWithConfig(__dirname, customConfig).input;
run(() => day12p1(...input)); // 9493
