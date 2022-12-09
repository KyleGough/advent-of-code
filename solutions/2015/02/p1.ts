import { getPuzzle } from '@utilities/getPuzzle';

export const day02p1 = (input: string) => {
  return input
    .split('\n')
    .map((dimensions) => {
      const [l, w, h] = dimensions.split('x').map((i) => parseInt(i));
      const areas = [l * w, w * h, h * l];
      return (
        2 * areas.reduce((prev, curr) => prev + curr, 0) + Math.min(...areas)
      );
    })
    .reduce((prev, curr) => prev + curr, 0);
};

const input = getPuzzle(__dirname).input;
console.log(day02p1(input)); // 1606483
