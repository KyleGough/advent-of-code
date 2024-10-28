import { intcodeComputerStep } from '../05/day05.helper';

interface Tile {
  x: number;
  y: number;
  id: number;
}

export const getTiles = (nums: number[]): Tile[] => {
  let step = { ip: 0, relativeBase: 0, output: 0, halt: false };
  const tiles: Tile[] = [];

  while (!step.halt) {
    step = intcodeComputerStep(nums, [], step.ip, step.relativeBase);
    const x = step.output;
    step = intcodeComputerStep(nums, [], step.ip, step.relativeBase);
    const y = step.output;
    step = intcodeComputerStep(nums, [], step.ip, step.relativeBase);
    const id = step.output;

    tiles.push({ x, y, id });
  }

  return tiles;
};
