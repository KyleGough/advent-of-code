import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { convolutions, countOccupiedSeats, simulateStep } from './day11.helper';

export const day11p1 = (input: string) => {
  let seats = input.split('\n').map((i) => i.split(''));
  let updated = true;

  do {
    [seats, updated] = simulateStep(seats, convolutionFn, 4);
  } while (updated);

  return countOccupiedSeats(seats);
};

const convolutionFn = (seats: string[][], x: number, y: number): string[] => {
  return convolutions.map((c) => seats?.[y + c.y]?.[x + c.x]);
};

const input = getPuzzle(__dirname).input;
run(() => day11p1(input)); // 2427
