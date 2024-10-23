import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Body, createGraph, parseOrbit } from './day06.helper';

export const day06p2 = (input: string) => {
  const orbits = input.split('\n').map(parseOrbit);
  const graph = createGraph(orbits);
  const orbitYou = getOrbitChain(graph, 'YOU');
  const orbitSan = getOrbitChain(graph, 'SAN');
  const commonOrbit = findNearestCommonOrbit(orbitYou, orbitSan);
  return orbitYou.indexOf(commonOrbit) + orbitSan.indexOf(commonOrbit);
};

const getOrbitChain = (graph: Record<string, Body>, body: string) => {
  const orbits = [];
  let current = graph[body];

  while (current.id !== 'COM') {
    current = current.orbits as Body;
    orbits.push(current.id);
  }

  return orbits;
};

const findNearestCommonOrbit = (orbitA: string[], orbitB: string[]): string => {
  for (const body of orbitA) {
    if (orbitB.includes(body)) {
      return body;
    }
  }

  return 'COM';
};

const input = getPuzzle(__dirname).input;
run(() => day06p2(input)); // 445
