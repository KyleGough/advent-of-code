import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

const shell = (n: number): number => {
  let i = 1;
  let j = 1;

  while (i * i <= n) {
    j = i;
    i += 2;
  }

  return j;
};

export const day03p1 = (input: string | number) => {
  const n = typeof input === 'string' ? parseInt(input) : input;
  const shellIndex = shell(n);
  const shellCount = (shellIndex + 1) / 2;
  const maxOddSquare = Math.pow(shellIndex, 2);
  const shellSideLength = Math.sqrt(maxOddSquare) + 1;
  let remainder = n - maxOddSquare;

  while (remainder > shellSideLength) {
    remainder -= shellSideLength;
  }

  return shellCount + Math.abs(remainder - shellSideLength / 2);
};

const input = getPuzzle(__dirname).input;
run(() => day03p1(input)); // 438
