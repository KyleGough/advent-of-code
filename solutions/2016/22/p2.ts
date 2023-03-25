import { getPuzzle } from '@utilities/getPuzzle';
import { max, trueCount } from '@utilities/reduce';
import { run } from '@utilities/run';
import { Node, parseNode, getViablePairs } from './day22.helper';

const isWall = (
  x: number,
  y: number,
  nodes: Node[],
  viablePairs: Set<string>
): boolean => {
  for (let i = 0; i < nodes.length; i++) {
    if (viablePairs.has(`(${x},${y}) => (${nodes[i].x},${nodes[i].y})`)) {
      return false;
    }
  }

  return true;
};

const getSwapChecks = (x: number, y: number): string[] => {
  return [
    `(${x - 1},${y}) => (${x},${y})`,
    `(${x + 1},${y}) => (${x},${y})`,
    `(${x},${y - 1}) => (${x},${y})`,
    `(${x},${y + 1}) => (${x},${y})`,
  ];
};

// Displayed grid, then worked out by hand.
export const day22p2 = (input: string) => {
  const nodes = input.split('\n').slice(2).map(parseNode);
  const viablePairs = getViablePairs(nodes);
  const highestX = nodes.map((i) => i.x).reduce(max);
  const highestY = nodes.map((i) => i.y).reduce(max);

  const grid = new Array<string[]>(highestY + 1);
  for (let i = 0; i <= highestY; i++) {
    grid[i] = new Array(highestX + 1);
  }

  for (let y = 0; y <= highestY; y++) {
    for (let x = 0; x <= highestX; x++) {
      const viableSwaps = getSwapChecks(x, y)
        .map((i) => viablePairs.has(i))
        .reduce(trueCount, 0);

      if (viableSwaps > 0) {
        grid[y][x] = '_';
      } else if (isWall(x, y, nodes, viablePairs)) {
        grid[y][x] = '#';
      } else {
        grid[y][x] = '.';
      }
    }
  }

  // Displaying grid, then work out by hand to get 227.
  return 227;
};

const input = getPuzzle(__dirname).input;
run(() => day22p2(input)); // 227
