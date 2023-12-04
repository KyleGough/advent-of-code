import { getPuzzle } from '@utilities/getPuzzle';
import { max, sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day01p2 = (input: string) => {
  return input.split('\n').map(parseGame).reduce(sum);
};

const parseGame = (input: string) => {
  const reds = input.matchAll(/(\d+) red/g);
  const maxRedCount = [...reds].map((i) => parseInt(i[1])).reduce(max);

  const greens = input.matchAll(/(\d+) green/g);
  const maxGreenCount = [...greens].map((i) => parseInt(i[1])).reduce(max);

  const blues = input.matchAll(/(\d+) blue/g);
  const maxBlueCount = [...blues].map((i) => parseInt(i[1])).reduce(max);

  return maxRedCount * maxGreenCount * maxBlueCount;
};

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 67363
