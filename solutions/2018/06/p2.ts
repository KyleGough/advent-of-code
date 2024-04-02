import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { sum } from '@utilities/reduce';
import { customConfig } from './customConfig';
import { getBoundingBox, parsePoint } from './day06.helper';

export const day06p2 = (input: string, validDistance: number) => {
  const points = input.split('\n').map(parsePoint);

  const { minX, maxX, minY, maxY } = getBoundingBox(points);
  let validPoints = 0;

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      const totalDistance = points
        .map((point) => point.getManhattanDistance(x, y))
        .reduce(sum, 0);
      if (totalDistance < validDistance) {
        validPoints += 1;
      }
    }
  }

  return validPoints;
};

const input = getPuzzleWithConfig(__dirname, customConfig).input;
run(() => day06p2(...input)); // 36238
