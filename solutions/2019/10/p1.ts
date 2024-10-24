import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { findStation, getAsteroids } from './day10.helper';

export const day10p1 = (input: string) => {
  const grid = input.split('\n').map((row) => row.split(''));
  const asteroids = getAsteroids(grid);
  return findStation(asteroids).count;
};

const input = getPuzzle(__dirname).input;
run(() => day10p1(input)); // 278
