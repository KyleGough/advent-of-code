import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { adjacentChecks, parseDroplet } from './day18.helper';

export const day18p1 = (input: string) => {
  const droplets = input.split('\n').map(parseDroplet);
  const analysedDroplets = [droplets[0]];

  for (let i = 1; i < droplets.length; i++) {
    const droplet = droplets[i];

    for (let j = 0; j < adjacentChecks.length; j++) {
      const check = adjacentChecks[j];
      const checkPosition = droplet.add(check);

      // If adjacent positions next to droplet are occupied, modify surface area.
      for (let k = 0; k < analysedDroplets.length; k++) {
        if (analysedDroplets[k].equals(checkPosition)) {
          analysedDroplets[k].surfaceArea--;
          droplet.surfaceArea--;
        }
      }
    }

    analysedDroplets.push(droplet);
  }

  const totalSurfaceArea = analysedDroplets
    .map((droplet) => droplet.surfaceArea)
    .reduce(sum);

  return totalSurfaceArea;
};

const input = getPuzzle(__dirname).input;
run(() => day18p1(input)); // 4400
