import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getArea } from './day18.helper';

export const day18p1 = (input: string) => {
  const steps = input.split('\n').map(parseStep);
  return getArea(steps);
};

const parseStep = (input: string): [string, number] => {
  const [direction, count] = input.split(' ');
  return [direction, parseInt(count)];
};

const input = getPuzzle(__dirname).input;
run(() => day18p1(input)); // 40131
