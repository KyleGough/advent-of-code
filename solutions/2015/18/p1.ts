import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customConfig } from './customConfig';
import { animate, lightCount } from './day18.helper';

export const day18p1 = (input: string, steps: number) => {
  let grid = input
    .split('\n')
    .map((row) => row.split('').map((cell) => cell === '#'));

  for (let i = 0; i < steps; i++) {
    grid = animate(grid);
  }

  return lightCount(grid);
};

const input = getPuzzleWithConfig(__dirname, customConfig).input;
run(() => day18p1(...input)); // 814
