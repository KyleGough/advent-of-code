import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseRoute, Graph } from './day09.helper';
import { permutations } from '@utilities/permutations';
import { max } from '@utilities/reduce';

export const day09p2 = (input: string) => {
  const routes = input.split('\n').map(parseRoute);
  const graph = new Graph(routes);
  const locations = graph.getLocations();
  const locationPermutations = permutations(locations);
  const maxDistance = locationPermutations
    .map((i) => graph.getTotalDistance(i))
    .reduce(max);

  return maxDistance;
};

const input = getPuzzle(__dirname).input;
run(() => day09p2(input)); // 898
