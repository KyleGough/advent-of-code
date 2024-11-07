import { getPuzzle } from '@utilities/getPuzzle';
import { PriorityQueue } from '@utilities/priority-queue';
import { run } from '@utilities/run';
import {
  compareState,
  Coord,
  getEntranceAndKeyCount,
  getPaths,
  KeyPath,
} from './day18.helper';

export const day18p1 = (input: string) => {
  const { grid, entrance, keyCount } = parseGrid(input);
  const cache: Record<string, KeyPath[]> = {};
  const distanceCache: Record<string, number> = {};
  const queue = new PriorityQueue<State>(compareState);

  queue.push({ ...entrance, keys: [], distance: 0 });

  while (queue.size()) {
    const { x, y, keys, distance } = queue.pop() as State;

    if (keys.length === keyCount) {
      return distance;
    }

    const hash = getHashState(x, y, keys);
    if (distanceCache[hash] && distance > distanceCache[hash]) {
      continue;
    }

    const paths = cache[hash] ?? getPaths(grid, keys, { x, y });
    cache[hash] = paths;

    for (const path of paths) {
      const nextKeys = [...keys, path.key];
      const nextDistance = distance + path.distance;
      const nextItem = { ...path, keys: nextKeys, distance: nextDistance };
      const nextHash = getHashState(path.x, path.y, nextKeys);
      const distanceEntry = distanceCache[nextHash] ?? Number.MAX_SAFE_INTEGER;

      if (nextDistance < distanceEntry) {
        queue.push(nextItem);
        distanceCache[nextHash] = nextDistance;
      }
    }
  }
};

type State = {
  keys: string[];
  distance: number;
  x: number;
  y: number;
};

const parseGrid = (
  input: string
): { grid: string[][]; entrance: Coord; keyCount: number } => {
  const grid = input.split('\n').map((row) => row.split(''));
  const [keyCount, entrance] = getEntranceAndKeyCount(grid);
  grid[entrance.y][entrance.x] = '.';
  return { grid, entrance, keyCount };
};

const getHashState = (x: number, y: number, keys: string[]): string => {
  return `${x},${y},${keys.sort().join('')}`;
};

const input = getPuzzle(__dirname).input;
run(() => day18p1(input)); // 3646
