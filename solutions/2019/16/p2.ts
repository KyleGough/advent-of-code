import { getPuzzle } from '@utilities/getPuzzle';
import { modulo } from '@utilities/modulo';
import { run } from '@utilities/run';

export const day16p2 = (input: string) => {
  const skip = parseInt(input.slice(0, 7));

  // The second half of FFT consists of just pattern 1s and thus are simple cumulative sums.
  const computeLength = 10000 * input.length - skip;
  const repeatCount = Math.ceil(computeLength / input.length);

  // Repeat input digits, keeping only digits from the skip value to the end.
  let digits = input.repeat(repeatCount).split('').map(Number);
  digits = digits.slice(Math.max(0, digits.length - computeLength));

  for (let phase = 0; phase < 100; phase++) {
    for (let i = digits.length - 1; i >= 0; i--) {
      digits[i - 1] += digits[i];
      digits[i - 1] = modulo(digits[i - 1], 10);
    }
  }

  return digits.slice(0, 8).join('');
};

const input = getPuzzle(__dirname).input;
run(() => day16p2(input)); // 41781287
