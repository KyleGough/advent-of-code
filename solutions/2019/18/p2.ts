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

export const day18p2 = (input: string) => {
  const { grid, entrances, keyCount } = parseGrid(input);
  const pathCache: Record<string, KeyPath[]> = {};
  const distanceCache: Record<string, number> = {};
  const queue = new PriorityQueue<State>(compareState);

  queue.push({ coords: entrances, keys: [], distance: 0 });

  while (queue.size()) {
    const { coords, keys, distance } = queue.pop() as State;

    if (keys.length === keyCount) {
      return distance;
    }

    const hash = getHashState(coords, keys);
    if (distanceCache[hash] && distance > distanceCache[hash]) {
      continue;
    }

    for (let robot = 0; robot < 4; robot++) {
      const pathHash = getPathHash(coords[robot], keys);
      const paths = pathCache[pathHash] ?? getPaths(grid, keys, coords[robot]);
      pathCache[pathHash] = paths;

      for (const path of paths) {
        const nextKeys = [...keys, path.key];
        const nextDistance = distance + path.distance;
        const nextCoords = cloneCoords(coords);
        nextCoords[robot] = { x: path.x, y: path.y };

        const nextItem = {
          coords: nextCoords,
          keys: nextKeys,
          distance: nextDistance,
        };
        const nextHash = getHashState(nextCoords, nextKeys);
        const distanceEntry =
          distanceCache[nextHash] ?? Number.MAX_SAFE_INTEGER;

        if (nextDistance < distanceEntry) {
          queue.push(nextItem);
          distanceCache[nextHash] = nextDistance;
        }
      }
    }
  }
};

type State = {
  keys: string[];
  distance: number;
  coords: Coord[];
};

const parseGrid = (
  input: string
): { grid: string[][]; entrances: Coord[]; keyCount: number } => {
  const grid = input.split('\n').map((row) => row.split(''));
  const [keyCount, entrance] = getEntranceAndKeyCount(grid);

  grid[entrance.y - 1][entrance.x - 1] = '.';
  grid[entrance.y - 1][entrance.x] = '#';
  grid[entrance.y - 1][entrance.x + 1] = '.';
  grid[entrance.y][entrance.x - 1] = '#';
  grid[entrance.y][entrance.x] = '#';
  grid[entrance.y][entrance.x + 1] = '#';
  grid[entrance.y + 1][entrance.x - 1] = '.';
  grid[entrance.y + 1][entrance.x] = '#';
  grid[entrance.y + 1][entrance.x + 1] = '.';

  const entrances = [
    { x: entrance.x - 1, y: entrance.y - 1 },
    { x: entrance.x + 1, y: entrance.y - 1 },
    { x: entrance.x - 1, y: entrance.y + 1 },
    { x: entrance.x + 1, y: entrance.y + 1 },
  ];

  return { grid, entrances, keyCount };
};

const getPathHash = (coord: Coord, keys: string[]): string => {
  return `${coord.x},${coord.y},${keys.sort().join('')}`;
};

const getHashState = (coords: Coord[], keys: string[]): string => {
  return `${coords.flat().join(',')},${keys.sort().join('')}`;
};

const cloneCoords = (coords: Coord[]): Coord[] => {
  const newCoords: Coord[] = [];
  for (const { x, y } of coords) {
    newCoords.push({ x, y });
  }
  return newCoords;
};

const input = getPuzzle(__dirname).input;
run(() => day18p2(input)); // 1730
