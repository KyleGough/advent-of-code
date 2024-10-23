import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Body, createGraph, parseOrbit } from './day06.helper';

export const day06p1 = (input: string) => {
  const orbits = input.split('\n').map(parseOrbit);
  const graph = createGraph(orbits);
  return getOrbitCounts(graph);
};

const getOrbitCounts = (graph: Record<string, Body>): number => {
  let count = 0;

  for (const body of Object.keys(graph)) {
    let current = graph[body];

    while (current.id !== 'COM') {
      current = current.orbits as Body;
      count += 1;
    }
  }

  return count;
};

const input = getPuzzle(__dirname).input;
run(() => day06p1(input)); // 254447
