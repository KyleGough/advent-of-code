import { getPuzzle } from '@utilities/getPuzzle';
import { max } from '@utilities/reduce';
import { run } from '@utilities/run';
import {
  parseValve,
  constructValveNetwork,
  getAllRoutes,
  getTotalFlow,
} from './day16.helper';

const timeLimit = 30;

export const day16p1 = (input: string) => {
  const valves = input.split('\n').map(parseValve);
  const valveNetwork = constructValveNetwork(valves);
  const valveNames = Object.keys(valveNetwork);
  const routes = getAllRoutes(valveNetwork, valveNames, timeLimit);

  const flows = routes.map((route) =>
    getTotalFlow(valveNetwork, ['AA', ...route], timeLimit)
  );

  return flows.reduce(max);
};

const input = getPuzzle(__dirname).input;
run(() => day16p1(input)); // 1792
