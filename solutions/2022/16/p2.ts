import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  parseValve,
  constructValveNetwork,
  getAllRoutes,
  getTotalFlow,
} from './day16.helper';

const timeLimit = 26;

export const day16p2 = (input: string) => {
  const valves = input.split('\n').map(parseValve);
  const valveNetwork = constructValveNetwork(valves);

  const valveNames = Object.keys(valveNetwork);
  const routes = getAllRoutes(valveNetwork, valveNames, timeLimit);

  let maxFlow = 0;

  const flowAmounts = routes.map((route) =>
    getTotalFlow(valveNetwork, ['AA', ...route], timeLimit)
  );

  // Find max flow from pairs of routes that have no intersection.
  for (let i = 0; i < routes.length - 1; i++) {
    for (let j = i + 1; j < routes.length; j++) {
      const flow = flowAmounts[i] + flowAmounts[j];
      if (flow > maxFlow) {
        const routeIntersection = routes[i].filter(
          (value) => routes[j].indexOf(value) > -1
        );
        if (!routeIntersection.length) {
          maxFlow = flow;
        }
      }
    }
  }

  return maxFlow;
};

const input = getPuzzle(__dirname).input;
run(() => day16p2(input)); // 2587
