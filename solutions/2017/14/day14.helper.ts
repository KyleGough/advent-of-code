import { day10p2 } from '../10/p2';

const hexToBinary = (input: string): string =>
  parseInt(input, 16).toString(2).padStart(4, '0');

export const hashGrid = (input: string): string[][] => {
  const grid: string[][] = [];

  for (let i = 0; i < 128; i++) {
    const key = `${input}-${i}`;
    const denseHash = day10p2(key);
    const row = denseHash.split('').map(hexToBinary).join('').split('');
    grid.push(row);
  }

  return grid;
};
