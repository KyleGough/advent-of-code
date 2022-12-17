import { getPuzzleWithCustomInput } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customInput } from './customInput';
import { Reindeer, parseReindeer } from './day14.helper';

const traverseReindeer = (reindeer: Reindeer, timeLimit: number): number => {
  const { speed, duration, rest } = reindeer;
  let isResting = false;
  let totalDistance = 0;

  while (timeLimit > 0) {
    if (isResting) {
      timeLimit -= rest;
    } else {
      if (timeLimit - duration > 0) {
        totalDistance += duration * speed;
      } else {
        totalDistance += speed * timeLimit;
      }
      timeLimit -= duration;
    }
    isResting = !isResting;
  }

  return totalDistance;
};

export const day14p1 = (input: string, timeLimit: number) => {
  const reindeers = input.split('\n').map(parseReindeer);
  const distances = reindeers.map((i) => traverseReindeer(i, timeLimit));
  return distances.reduce((prev, curr) => Math.max(prev, curr), 0);
};

const input = getPuzzleWithCustomInput(__dirname, customInput).input;
run(() => day14p1(...input)); // 2696
