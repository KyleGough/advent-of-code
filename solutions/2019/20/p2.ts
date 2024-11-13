import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Coord, coordToString, neighbours, parseGrid } from './day20.helper';

export const day20p2 = (input: string) => {
  const { grid, labels, start, end } = parseGrid(input);
  const MAX_DEPTH = 25; // Heuristic to speed-up runtime.
  const visited = new Set<string>();
  let queue: Coord[] = [start];
  let steps = 0;

  // Create mapping of start coord to end coord.
  const portals: Record<string, Coord> = {};
  for (const [portalA, portalB] of Object.values(labels)) {
    portals[`${portalA.x},${portalA.y}`] = portalB;
    portals[`${portalB.x},${portalB.y}`] = portalA;
  }

  while (queue.length) {
    const nextQueue: Coord[] = [];

    for (const { x, y, shell } of queue) {
      // Reached ZZ coordinate.
      if (x === end.x && y === end.y && shell === 0) {
        return steps;
      }

      // Regular movement.
      for (const { dx, dy } of neighbours) {
        const hash = coordToString({ x: x + dx, y: y + dy, shell });
        if (!visited.has(hash) && grid[y + dy][x + dx] === '.') {
          visited.add(coordToString({ x, y, shell }));
          nextQueue.push({ x: x + dx, y: y + dy, shell });
        }
      }

      // If warp point, teleport to destination.
      const warp = portals[`${x},${y}`];
      if (warp && (shell > 0 || warp.shell === 1) && shell <= MAX_DEPTH) {
        visited.add(coordToString({ ...warp, shell: shell + warp.shell }));
        nextQueue.push({ x: warp.x, y: warp.y, shell: shell + warp.shell });
      }
    }

    queue = nextQueue;
    steps += 1;
  }
};

const input = getPuzzle(__dirname).input;
run(() => day20p2(input)); // 7498
