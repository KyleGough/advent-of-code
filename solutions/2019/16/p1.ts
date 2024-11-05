import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day16p1 = (input: string) => {
  let digits = input.split('').map(Number);

  for (let phase = 0; phase < 100; phase++) {
    digits = fft(digits);
  }

  return digits.slice(0, 8).join('');
};

const fft = (digits: number[]): number[] => {
  const nextDigits: number[] = [];

  const pattern = [0, 1, 0, -1];

  for (let i = 0; i < digits.length; i++) {
    let digit = 0;

    for (let j = i; j < digits.length; j++) {
      const index = Math.floor((j + 1) / (i + 1)) % 4;
      digit += pattern[index] * digits[j];
    }

    nextDigits.push(Math.abs(digit) % 10);
  }

  return nextDigits;
};

const input = getPuzzle(__dirname).input;
run(() => day16p1(input)); // 58100105
