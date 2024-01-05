import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day25p1 = (input: string) => {
  const graph = constructGraph(input);

  let edgeCounts: Record<string, number> = {};

  // BFS from every node, counting uses of each edge.
  for (const startNode of Object.keys(graph)) {
    edgeCounts = bfs(startNode, graph, edgeCounts);
  }

  const counts: EdgeCount[] = [];

  // Find the 3 most used edges.
  for (const edge of Object.keys(edgeCounts)) {
    counts.push({ edge, count: edgeCounts[edge] });
  }

  counts.sort((a: EdgeCount, b: EdgeCount) => {
    return b.count - a.count;
  });

  const minCut = counts.slice(0, 3).map((i) => i.edge);

  // Remove min-cut edges.
  for (const edge of minCut) {
    const [start, end] = edge.split('-');
    graph[start] = graph[start].filter((i) => i !== end);
    graph[end] = graph[end].filter((i) => i !== start);
  }

  // Find connectivity.
  const totalNodeCount = Object.keys(graph).length;
  const subGraphNodeCount = connectivity(Object.keys(graph)[0], graph);
  return subGraphNodeCount * (totalNodeCount - subGraphNodeCount);
};

type Graph = Record<string, string[]>;

interface QueueItem {
  node: string;
  history: string[];
}

interface EdgeCount {
  edge: string;
  count: number;
}

interface Node {
  name: string;
  connections: string[];
}

const connectivity = (start: string, graph: Graph) => {
  const queue: string[] = [start];
  const seen = new Set<string>();

  while (queue.length) {
    const node = queue.shift() as string;

    if (seen.has(node)) {
      continue;
    }

    seen.add(node);

    const neighbours = graph[node];

    for (const n of neighbours) {
      queue.push(n);
    }
  }

  return seen.size;
};

const bfs = (
  start: string,
  graph: Graph,
  edgeCount: Record<string, number>
) => {
  const queue: QueueItem[] = [{ node: start, history: [] }];
  const seen = new Set<string>();

  while (queue.length) {
    const { node, history } = queue.shift() as QueueItem;

    if (seen.has(node)) {
      continue;
    }

    seen.add(node);

    const nextHistory = [...history, node];

    for (let i = 0; i < nextHistory.length - 1; i++) {
      const a = [nextHistory[i], nextHistory[i + 1]].sort();
      const label = a.join('-');
      edgeCount[label] = edgeCount[label] ? edgeCount[label] + 1 : 1;
    }

    const neighbours = graph[node];

    for (const n of neighbours) {
      queue.push({ node: n, history: nextHistory });
    }
  }

  return edgeCount;
};

const constructGraph = (input: string): Graph => {
  const graph: Record<string, string[]> = {};
  const lines = input.split('\n').map(parseLine);

  for (let i = 0; i < lines.length; i++) {
    const { name: start, connections } = lines[i];

    for (let j = 0; j < connections.length; j++) {
      const end = connections[j];
      graph[start] = graph[start] ? [...graph[start], end] : [end];
      graph[end] = graph[end] ? [...graph[end], start] : [start];
    }
  }

  return graph;
};

const parseLine = (input: string): Node => {
  const [name, list] = input.split(': ');
  return {
    name,
    connections: list.split(' '),
  };
};

const input = getPuzzle(__dirname).input;
run(() => day25p1(input)); // 547410
