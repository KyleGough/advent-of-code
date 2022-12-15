import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day02p2 = (input: string) => {
  return input
    .split('\n')
    .map((line) => {
      const dimensions = line
        .split('x')
        .map((i) => parseInt(i))
        .sort((a, b) => a - b);
      const volume = dimensions.reduce((prev, curr) => prev * curr, 1);
      return volume + 2 * dimensions[0] + 2 * dimensions[1];
    })
    .reduce((prev, curr) => prev + curr, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day02p2(input)); // 3842356
