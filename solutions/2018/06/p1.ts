import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getBoundingBox, parsePoint, Point } from './day06.helper';

export const day06p1 = (input: string) => {
  const points = input.split('\n').map(parsePoint);

  const pointMap: Record<string, number> = points.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.toString()]: 0,
    }),
    {}
  );

  const { minX, maxX, minY, maxY } = getBoundingBox(points);

  const infAreaPoints = new Set<string>();

  // Vertical sides infinite area check.
  for (let x = minX - 1; x <= maxX + 1; x++) {
    const leftPoint = getClosestPoint(points, x, minY - 1);
    const rightPoint = getClosestPoint(points, x, maxY + 1);
    if (leftPoint) {
      infAreaPoints.add(leftPoint);
    }
    if (rightPoint) {
      infAreaPoints.add(rightPoint);
    }
  }

  // Horizontal sides infinite area check.
  for (let y = minY - 1; y <= maxY + 1; y++) {
    const topPoint = getClosestPoint(points, minX - 1, y);
    const bottomPoint = getClosestPoint(points, maxX + 1, y);
    if (topPoint) {
      infAreaPoints.add(topPoint);
    }
    if (bottomPoint) {
      infAreaPoints.add(bottomPoint);
    }
  }

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      let minDistance = Number.MAX_SAFE_INTEGER;
      let minPoint = '';

      points.forEach((point) => {
        const distance = point.getManhattanDistance(x, y);
        if (distance < minDistance) {
          minPoint = point.toString();
          minDistance = distance;
        } else if (distance === minDistance) {
          minPoint = '';
        }
      });

      if (minPoint) {
        pointMap[minPoint] += 1;
      }
    }
  }

  const keys = Object.keys(pointMap).filter((key) => !infAreaPoints.has(key));
  const maxArea = keys.reduce(
    (prev, curr) => Math.max(prev, pointMap[curr]),
    0
  );

  return maxArea;
};

const getClosestPoint = (points: Point[], x: number, y: number) => {
  let minDistance = Number.MAX_SAFE_INTEGER;
  let minPoint = '';

  points.forEach((point) => {
    const distance = point.getManhattanDistance(x, y);
    if (distance < minDistance) {
      minPoint = point.toString();
      minDistance = distance;
    } else if (distance === minDistance) {
      minPoint = '';
    }
  });

  return minPoint;
};

const input = getPuzzle(__dirname).input;
run(() => day06p1(input)); // 3909
