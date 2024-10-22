import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getIntersections, parseWire, Wire } from './day03.helper';

export const day03p1 = (input: string) => {
  const [wireA, wireB] = input.split('\n').map(parseWire);
  const intersection = getNearestIntersection(wireA, wireB);
  return Math.abs(intersection[0]) + Math.abs(intersection[1]);
};

export const getNearestIntersection = (
  wireA: Wire,
  wireB: Wire
): [number, number] => {
  const intersections = getIntersections(wireA, wireB);
  let minDistance = Number.MAX_SAFE_INTEGER;
  let minIntersection: [number, number] = [0, 0];

  for (const [x, y] of intersections) {
    const distance = Math.abs(x) + Math.abs(y);
    if (distance < minDistance) {
      minDistance = distance;
      minIntersection = [x, y];
    }
  }

  return minIntersection;
};

const input = getPuzzle(__dirname).input;
run(() => day03p1(input)); // 245
