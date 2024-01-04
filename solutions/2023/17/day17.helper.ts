import { sum } from '@utilities/reduce';

interface Node {
  heat: number;
  neighbours: Record<string, number>;
}

type Graph = Record<string, Node>;

export const dijkstras = (graph: Graph, grid: number[][]): number => {
  const queue = ['h-0-0', 'v-0-0'];
  const width = grid[0].length;
  const height = grid.length;

  const hDest = `h-${width - 1}-${height - 1}`;
  const vDest = `v-${width - 1}-${height - 1}`;

  while (queue.length) {
    const node = queue.shift() as string;
    const { heat, neighbours } = graph[node];

    if (heat > Math.min(graph[hDest].heat, graph[vDest].heat)) {
      continue;
    }

    for (const [n, h] of Object.entries(neighbours)) {
      if (heat + h < graph[n].heat) {
        graph[n].heat = heat + h;
        queue.push(n);
      }
    }
  }

  return Math.min(graph[hDest].heat, graph[vDest].heat);
};

export const createGraph = (
  grid: number[][],
  minLength: number,
  maxLength: number
): Graph => {
  const width = grid[0].length;
  const height = grid.length;
  const graph: Graph = {};

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      graph[`h-${x}-${y}`] = {
        heat: Number.MAX_SAFE_INTEGER,
        neighbours: {},
      };

      graph[`v-${x}-${y}`] = {
        heat: Number.MAX_SAFE_INTEGER,
        neighbours: {},
      };

      // Skip destination node.
      if (x === width - 1 && y === height - 1) {
        continue;
      }

      for (let i = minLength; i <= maxLength; i++) {
        // North.
        if (y - i >= 0) {
          const pathHeat = Array.from({ length: i })
            .map((_, e) => grid[y - e - 1][x])
            .reduce(sum, 0);
          graph[`v-${x}-${y}`].neighbours[`h-${x}-${y - i}`] = pathHeat;
        }

        // South.
        if (y + i < height) {
          const pathHeat = Array.from({ length: i })
            .map((_, e) => grid[y + e + 1][x])
            .reduce(sum, 0);
          graph[`v-${x}-${y}`].neighbours[`h-${x}-${y + i}`] = pathHeat;
        }

        // West.
        if (x - i >= 0) {
          const pathHeat = Array.from({ length: i })
            .map((_, e) => grid[y][x - e - 1])
            .reduce(sum, 0);
          graph[`h-${x}-${y}`].neighbours[`v-${x - i}-${y}`] = pathHeat;
        }

        // East.
        if (x + i < width) {
          const pathHeat = Array.from({ length: i })
            .map((_, e) => grid[y][x + e + 1])
            .reduce(sum, 0);
          graph[`h-${x}-${y}`].neighbours[`v-${x + i}-${y}`] = pathHeat;
        }
      }
    }
  }

  graph[`h-0-0`].heat = 0;
  graph[`v-0-0`].heat = 0;

  return graph;
};
