import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getArea } from './day18.helper';

export const day18p2 = (input: string) => {
  const steps = input.split('\n').map(parseStep);
  return getArea(steps);
};

const parseStep = (input: string): [string, number] => {
  const hex = input.match(/([0-9a-f]{6})/);

  if (!hex) {
    throw new Error('Unable to parse step.');
  }

  const hexDistance = hex[0].slice(0, 5);
  const hexDirection = parseInt(hex[0].slice(-1));
  const direction = ['R', 'D', 'L', 'U'][hexDirection];

  return [direction, parseInt(hexDistance, 16)];
};

const input = getPuzzle(__dirname).input;
run(() => day18p2(input)); // 104454050898331
