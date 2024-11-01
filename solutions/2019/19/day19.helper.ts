import { intcodeComputer } from '../05/day05.helper';

export const isTractorBeam = (
  nums: number[],
  x: number,
  y: number
): boolean => {
  return intcodeComputer([...nums], [x, y]) === 1;
};
