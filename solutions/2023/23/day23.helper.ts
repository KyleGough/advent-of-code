interface ExplorationQueueItem {
  x: number;
  y: number;
  previousJunction: string;
  previousSteps: number;
}

interface DFSQueueItem {
  coord: string;
  visited: string[];
  length: number;
}

interface CompressedGraph {
  graph: Graph;
  start: string;
  end: string;
}

const isPath = (x: number, y: number, grid: string[][]): boolean => {
  const cell = grid?.[y]?.[x];
  return Boolean(cell) && cell !== '#';
};

const isJunction = (x: number, y: number, grid: string[][]): boolean => {
  let count = 0;
  isPath(x, y - 1, grid) && count++;
  isPath(x, y + 1, grid) && count++;
  isPath(x - 1, y, grid) && count++;
  isPath(x + 1, y, grid) && count++;
  return count >= 3 || y === grid.length - 1;
};

const canMove = (
  x: number,
  y: number,
  grid: string[][],
  paths: string[]
): boolean => {
  const cell = grid?.[y]?.[x];
  return Boolean(cell) && paths.findIndex((i) => i === cell) !== -1;
};

export class Graph {
  _graph: Record<string, Record<string, number>>;

  constructor() {
    this._graph = {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addEdge(s: string, t: string, steps: number) {
    throw new Error('addEdge must be defined in sub-class.');
  }
}

const validPaths = {
  north: ['.', '^'],
  south: ['.', 'v'],
  east: ['.', '>'],
  west: ['.', '<'],
};

export const getCompressedGraph = (
  input: string,
  graph: Graph
): CompressedGraph => {
  const grid = input.split('\n').map((i) => i.split(''));
  const startX = grid[0].findIndex((i) => i === '.');
  const endX = grid[grid.length - 1].findIndex((i) => i === '.');

  const queue: ExplorationQueueItem[] = [
    { x: startX, y: 0, previousJunction: `${startX},0`, previousSteps: -1 },
  ];
  const visited = new Set<string>();

  while (queue.length) {
    const { x, y, previousJunction, previousSteps } =
      queue.pop() as ExplorationQueueItem;
    let steps = previousSteps + 1;

    if (visited.has(`${x},${y}`)) {
      if (isJunction(x, y, grid)) {
        graph.addEdge(previousJunction, `${x},${y}`, steps);
      }
      continue;
    }

    visited.add(`${x},${y}`);

    let nextJunction = previousJunction;

    if (isJunction(x, y, grid)) {
      nextJunction = `${x},${y}`;
      graph.addEdge(previousJunction, nextJunction, steps);
      steps = 0;
    }

    // North.
    if (canMove(x, y - 1, grid, validPaths.north)) {
      queue.push({
        x,
        y: y - 1,
        previousJunction: nextJunction,
        previousSteps: steps,
      });
    }

    // South.
    if (canMove(x, y + 1, grid, validPaths.south)) {
      queue.push({
        x,
        y: y + 1,
        previousJunction: nextJunction,
        previousSteps: steps,
      });
    }

    // East.
    if (canMove(x + 1, y, grid, validPaths.east)) {
      queue.push({
        x: x + 1,
        y,
        previousJunction: nextJunction,
        previousSteps: steps,
      });
    }

    // West.
    if (canMove(x - 1, y, grid, validPaths.west)) {
      queue.push({
        x: x - 1,
        y,
        previousJunction: nextJunction,
        previousSteps: steps,
      });
    }
  }

  return {
    graph,
    start: `${startX},0`,
    end: `${endX},${grid.length - 1}`,
  };
};

export const getLongestPath = ({
  graph,
  start,
  end,
}: CompressedGraph): number => {
  const queue: DFSQueueItem[] = [{ coord: start, visited: [start], length: 0 }];
  let maxLength = 0;

  while (queue.length) {
    const { coord, visited, length } = queue.pop() as DFSQueueItem;
    // Reached the end node.
    if (coord === end) {
      if (length > maxLength) {
        maxLength = length;
      }
      continue;
    }

    for (const [node, steps] of Object.entries(graph._graph[coord])) {
      if (visited.findIndex((i) => i === node) === -1) {
        queue.push({
          coord: node,
          visited: [...visited, node],
          length: length + steps,
        });
      }
    }
  }

  return maxLength;
};
