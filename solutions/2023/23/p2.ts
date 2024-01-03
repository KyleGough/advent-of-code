import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getCompressedGraph, Graph, getLongestPath } from './day23.helper';

export const day23p2 = (input: string) => {
  return getLongestPath(getCompressedGraph(input, new UndirectedGraph()));
};

class UndirectedGraph extends Graph {
  constructor() {
    super();
  }

  addEdge(s: string, t: string, steps: number) {
    if (s === t) return;

    this._graph[s] = this._graph[s]
      ? { ...this._graph[s], [t]: steps }
      : { [t]: steps };

    this._graph[t] = this._graph[t]
      ? { ...this._graph[t], [s]: steps }
      : { [s]: steps };
  }
}

const input = getPuzzle(__dirname).input;
run(() => day23p2(input)); // 6230
