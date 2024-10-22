import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getIntersections, parseWire, Wire } from './day03.helper';
import { min } from '@utilities/reduce';

export const day03p2 = (input: string) => {
  const [wireA, wireB] = input.split('\n').map(parseWire);
  const intersections = getIntersections(wireA, wireB);
  const distancesA = getDistancesToIntersections(wireA, intersections);
  const distancesB = getDistancesToIntersections(wireB, intersections);
  const combinedDistances = [];

  for (let i = 0; i < distancesA.length; i++) {
    combinedDistances[i] = distancesA[i] + distancesB[i];
  }

  return combinedDistances.reduce(min, Number.MAX_SAFE_INTEGER);
};

const getDistancesToIntersections = (
  wire: Wire,
  intersections: [number, number][]
): number[] => {
  const distances = Array(intersections.length).fill(Number.MAX_SAFE_INTEGER);
  let wireDistance = 0;

  for (let v = 0; v < wire.vertices.length - 1; v++) {
    const start = wire.vertices[v];
    const end = wire.vertices[v + 1];

    if (start[0] === end[0]) {
      // Vertical line.
      const minY = Math.min(start[1], end[1]);
      const maxY = Math.max(start[1], end[1]);

      for (let i = 0; i < intersections.length; i++) {
        const [x, y] = intersections[i];

        if (x !== start[0]) continue;
        if (y < minY || y > maxY) continue;

        const distance = wireDistance + Math.abs(y - start[1]);
        distances[i] = distance;
      }
    } else {
      // Horizontal line.
      const minX = Math.min(start[0], end[0]);
      const maxX = Math.max(start[0], end[0]);

      for (let i = 0; i < intersections.length; i++) {
        const [x, y] = intersections[i];

        if (y !== start[1]) continue;
        if (x < minX || x > maxX) continue;

        const distance = wireDistance + Math.abs(x - start[0]);
        distances[i] = distance;
      }
    }

    wireDistance += Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
  }

  return distances;
};

const input = getPuzzle(__dirname).input;
run(() => day03p2(input)); // 48262
