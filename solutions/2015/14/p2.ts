import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customInput } from './customInput';
import { Reindeer, parseReindeer } from './day14.helper';

const traverseReindeer = (reindeer: Reindeer, timeLimit: number): number[] => {
  const { speed, duration, rest } = reindeer;
  const distances: number[] = [];
  let isResting = false;
  let totalDistance = 0;
  let progress = duration;

  for (let i = timeLimit; i > 0; i--) {
    if (isResting) {
      distances.push(totalDistance);
      progress--;
      if (progress <= 0) {
        isResting = false;
        progress = duration;
      }
    } else {
      totalDistance += speed;
      distances.push(totalDistance);
      progress--;
      if (progress <= 0) {
        isResting = true;
        progress = rest;
      }
    }
  }

  return distances;
};

const getMaxDistances = (distances: number[][]): number[] => {
  const length = distances[0].length;
  const maxDistances: number[] = [];

  for (let i = 0; i < length; i++) {
    maxDistances.push(
      distances
        .map((distance) => distance[i])
        .reduce((prev, curr) => Math.max(prev, curr), 0)
    );
  }

  return maxDistances;
};

const getReindeerPoints = (
  distances: number[],
  maxDistances: number[],
  timeLimit: number
): number => {
  let points = 0;

  for (let i = 0; i < timeLimit; i++) {
    if (distances[i] === maxDistances[i]) {
      points++;
    }
  }

  return points;
};

export const day14p2 = (input: string, timeLimit: number) => {
  const reindeers = input.split('\n').map(parseReindeer);
  const distances = reindeers.map((i) => traverseReindeer(i, timeLimit));
  const maxDistances = getMaxDistances(distances);
  const reindeerPoints = distances.map((reindeer) =>
    getReindeerPoints(reindeer, maxDistances, timeLimit)
  );

  return reindeerPoints.reduce((prev, curr) => Math.max(prev, curr), 0);
};

const input = getPuzzleWithConfig(__dirname, customInput).example;
run(() => day14p2(...input)); // 1084
