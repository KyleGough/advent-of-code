import { matchNumbers } from '@utilities/string';

export interface Target {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export const parseTarget = (input: string): Target => {
  const target = matchNumbers(input);
  return {
    minX: target[0],
    maxX: target[1],
    minY: target[2],
    maxY: target[3],
  };
};

export const triangleNumber = (n: number): number => {
  return (n * (n + 1)) / 2;
};
