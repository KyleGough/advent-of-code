import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getCompressedGraph, Graph, getLongestPath } from './day23.helper';

export const day23p1 = (input: string) => {
  return getLongestPath(getCompressedGraph(input, new DirectedGraph()));
};

class DirectedGraph extends Graph {
  constructor() {
    super();
  }

  addEdge(s: string, t: string, steps: number) {
    if (s === t) return;

    this._graph[s] = this._graph[s]
      ? { ...this._graph[s], [t]: steps }
      : { [t]: steps };
  }
}

const input = getPuzzle(__dirname).input;
run(() => day23p1(input)); // 1930
