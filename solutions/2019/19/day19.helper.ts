import { Intcode } from '../05/day05.helper';

export const isTractorBeam = (
  nums: number[],
  x: number,
  y: number
): boolean => {
  return new Intcode([...nums]).runProgram([x, y]) === 1;
};
