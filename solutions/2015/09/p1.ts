import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseRoute, Graph } from './day09.helper';
import { permutations } from '@utilities/permutations';
import { min } from '@utilities/reduce';

export const day09p1 = (input: string) => {
  const routes = input.split('\n').map(parseRoute);
  const graph = new Graph(routes);
  const locations = graph.getLocations();
  const locationPermutations = permutations(locations);
  const minDistance = locationPermutations
    .map((i) => graph.getTotalDistance(i))
    .reduce(min, Number.MAX_VALUE);

  return minDistance;
};

const input = getPuzzle(__dirname).input;
run(() => day09p1(input)); // 251
