import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { modulo } from '@utilities/modulo';

const rotateLeft = (dial: number, distance: number): [number, number] => {
  const nextDial = modulo(dial - distance, 100);

  if (dial - distance > 0) {
    return [nextDial, 0];
  }

  if (dial === 0) {
    return [nextDial, Math.floor(distance / 100)];
  }

  return [nextDial, Math.ceil((distance - dial + 1) / 100)];
};

const rotateRight = (dial: number, distance: number): [number, number] => {
  const nextDial = modulo(dial + distance, 100);
  const zeroCount = Math.floor((dial + distance) / 100);
  return [nextDial, zeroCount];
};

export const day01p2 = (input: string) => {
  const lines = input.split('\n');
  let dial = 50;
  let zeroCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const direction = lines[i].charAt(0);
    const distance = parseInt(lines[i].slice(1));
    let zeroes: number;

    const rotate = direction === 'L' ? rotateLeft : rotateRight;
    [dial, zeroes] = rotate(dial, distance);
    zeroCount += zeroes;
  }

  return zeroCount;
};

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 5820
