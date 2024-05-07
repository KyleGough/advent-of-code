import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day25p1 = (input: string) => {
  const points = input.split('\n').map(parsePoint);
  const joins: FixedPointJoins = {};

  for (let x = 0; x < points.length; x++) {
    joins[x] = [];
  }

  // Check if every combination of fixed points join.
  for (let y = 0; y < points.length - 1; y++) {
    for (let x = y + 1; x < points.length; x++) {
      if (manhattanDistance(points[x], points[y]) <= 3) {
        joins[x].push(y);
        joins[y].push(x);
      }
    }
  }

  let constellations = 0;

  while (Object.keys(joins).length) {
    extractConstellation(joins, parseInt(Object.keys(joins)[0]));
    constellations += 1;
  }

  return constellations;
};

type FixedPointJoins = Record<number, number[]>;

const parsePoint = (input: string): number[] => {
  return input.split(',').map((i) => parseInt(i));
};

const manhattanDistance = (pointA: number[], pointB: number[]): number => {
  let distance = 0;
  for (let i = 0; i < pointA.length; i++) {
    distance += Math.abs(pointA[i] - pointB[i]);
  }
  return distance;
};

const extractConstellation = (joins: FixedPointJoins, start: number) => {
  const queue: number[] = [start];

  while (queue.length) {
    const queueItem = queue.pop() as number;
    for (const fixedPoint of joins[queueItem] ?? []) {
      queue.push(fixedPoint);
    }
    delete joins[queueItem];
  }
};

const input = getPuzzle(__dirname).input;
run(() => day25p1(input)); // 327
