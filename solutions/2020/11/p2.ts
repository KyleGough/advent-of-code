import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { convolutions, countOccupiedSeats, simulateStep } from './day11.helper';

export const day11p2 = (input: string) => {
  let seats = input.split('\n').map((i) => i.split(''));
  let updated = true;

  do {
    [seats, updated] = simulateStep(seats, convolutionFn, 5);
  } while (updated);

  return countOccupiedSeats(seats);
};

const convolutionFn = (seats: string[][], x: number, y: number): string[] => {
  return convolutions.map((c) => {
    let cx = x;
    let cy = y;
    let seat = '';

    do {
      cx += c.x;
      cy += c.y;
      seat = seats?.[cy]?.[cx];
    } while (seat === '.');

    return seat;
  });
};

const input = getPuzzle(__dirname).input;
run(() => day11p2(input)); // 2199
