export const buildGraph = (input: string): Record<string, string[]> => {
  const lines = input.split('\n').map((row) => row.split('-'));
  const graph: Record<string, string[]> = {};

  for (const [source, target] of lines) {
    graph[source] = graph[source] ?? [];
    graph[target] = graph[target] ?? [];
    if (target !== 'start') {
      graph[source].push(target);
    }
    if (source !== 'start') {
      graph[target].push(source);
    }
  }

  delete graph['end'];

  return graph;
};

export const isLargeCave = (node: string): boolean => {
  return node.toUpperCase() === node;
};
