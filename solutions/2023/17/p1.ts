import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { createGraph, dijkstras } from './day17.helper';

export const day17p1 = (input: string) => {
  const grid = input.split('\n').map((row) => row.split('').map(Number));
  const graph = createGraph(grid, 1, 3);
  return dijkstras(graph, grid);
};

const input = getPuzzle(__dirname).input;
run(() => day17p1(input)); // 907
