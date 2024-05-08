import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { matchNumbers } from '@utilities/string';
import { PriorityQueue } from '@utilities/priority-queue';
import { getCave } from './day22.helper';

export const day22p2 = (input: string) => {
  const lines = input.split('\n');
  const depth = matchNumbers(lines[0])[0];
  const [tx, ty] = matchNumbers(lines[1]);
  const buffer = 1000;
  const cave = getCave(depth, tx, ty, buffer);
  const target = getKey(tx, ty, 1);
  return findBestRoute(cave, target);
};

interface QueueItem {
  time: number;
  x: number;
  y: number;
  tool: number;
}

const adjacentCells = [
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
];

const getKey = (x: number, y: number, tool: number): string => {
  return `${x},${y},${tool}`;
};

const findBestRoute = (cave: number[][], target: string): number => {
  const optimal: Record<string, number> = {};
  const comparator = (a: QueueItem, b: QueueItem) => a.time < b.time;
  const queue = new PriorityQueue(comparator);
  queue.push({ time: 0, x: 0, y: 0, tool: 1 });

  while (queue.size()) {
    const { time, x, y, tool } = queue.pop() as QueueItem;
    const key = getKey(x, y, tool);

    if (optimal[key] && optimal[key] <= time) {
      continue;
    } else {
      optimal[key] = time;
    }

    if (key === target) {
      break;
    }

    for (let i = 0; i < 3; i++) {
      if (i !== tool && i !== cave[y][x]) {
        // Switching tool takes 7 minutes.
        queue.push({ time: time + 7, x, y, tool: i });
      }
    }

    for (const { dx, dy } of adjacentCells) {
      const nextX = x + dx;
      const nextY = y + dy;

      // Negative indexs are solid walls.
      if (nextX < 0) continue;
      if (nextY < 0) continue;

      // Cannot traverse due to insuffient tool.
      if (cave[nextY][nextX] === tool) continue;

      // Moving to an adjacent cell takes 1 minute.
      queue.push({ time: time + 1, x: nextX, y: nextY, tool });
    }
  }

  return optimal[target];
};

const input = getPuzzle(__dirname).input;
run(() => day22p2(input)); // 1051
