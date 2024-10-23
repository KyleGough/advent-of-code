export type Body = {
  id: string;
  satellites: Body[];
  orbits?: Body;
};

export const parseOrbit = (input: string): [string, string] => {
  return input.split(')') as [string, string];
};

export const createGraph = (
  orbits: [string, string][]
): Record<string, Body> => {
  const graph: Record<string, Body> = {};

  for (const [body, satellite] of orbits) {
    if (!graph[body]) {
      graph[body] = { id: body, satellites: [] };
    }
    if (!graph[satellite]) {
      graph[satellite] = { id: satellite, satellites: [] };
    }

    graph[body].satellites.push(graph[satellite]);
    graph[satellite].orbits = graph[body];
  }

  return graph;
};
