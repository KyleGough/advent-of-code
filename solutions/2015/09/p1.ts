import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseRoute, Graph, getLocationPermutations } from './day09.helper';

export const day09p1 = (input: string) => {
  const routes = input.split('\n').map(parseRoute);
  const graph = new Graph(routes);
  const locations = graph.getLocations();
  const locationPermutations = getLocationPermutations(locations);
  const minDistance = locationPermutations
    .map((i) => graph.getTotalDistance(i))
    .reduce((prev, curr) => Math.min(prev, curr), Number.MAX_VALUE);

  return minDistance;
};

const input = getPuzzle(__dirname).input;
run(() => day09p1(input)); // 251
