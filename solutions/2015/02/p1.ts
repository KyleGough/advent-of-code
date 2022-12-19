import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day02p1 = (input: string) => {
  return input
    .split('\n')
    .map((dimensions) => {
      const [l, w, h] = dimensions.split('x').map((i) => parseInt(i));
      const areas = [l * w, w * h, h * l];
      return 2 * areas.reduce(sum) + Math.min(...areas);
    })
    .reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day02p1(input)); // 1606483
