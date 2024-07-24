import { sum } from '@utilities/reduce';

type Coord = {
  x: number;
  y: number;
};

export const convolutions: Coord[] = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

type ConvolutionFn = (seats: string[][], x: number, y: number) => string[];

export const simulateStep = (
  seats: string[][],
  convolutionFn: ConvolutionFn,
  occupiedThreshold: number
): [string[][], boolean] => {
  const nextSeats: string[][] = [];
  let updated = false;

  for (let y = 0; y < seats.length; y++) {
    const nextRow = [];
    for (let x = 0; x < seats[y].length; x++) {
      const currentSeat = seats[y][x];

      if (currentSeat === '.') {
        nextRow.push('.');
        continue;
      }

      const adjacentSeats = convolutionFn(seats, x, y);

      const occupiedSeats = adjacentSeats.filter((s) => s === '#').length;
      let nextSeat = currentSeat;

      if (occupiedSeats === 0) {
        nextSeat = '#';
      } else if (occupiedSeats >= occupiedThreshold) {
        nextSeat = 'L';
      }

      if (nextSeat !== currentSeat) {
        updated = true;
      }

      nextRow.push(nextSeat);
    }
    nextSeats.push(nextRow);
  }

  return [nextSeats, updated];
};

export const countOccupiedSeats = (seats: string[][]): number => {
  return seats.map((row) => row.filter((s) => s === '#').length).reduce(sum, 0);
};
