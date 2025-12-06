import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { modulo } from '@utilities/modulo';

export const day01p1 = (input: string) => {
  const lines = input.split('\n');
  let dial = 50;
  let zeroCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const direction = lines[i].charAt(0);
    const distance = parseInt(lines[i].slice(1));

    if (direction === 'L') {
      dial = modulo(dial - distance, 100);
    } else {
      dial = modulo(dial + distance, 100);
    }

    if (dial === 0) {
      zeroCount += 1;
    }
  }

  return zeroCount;
};

const input = getPuzzle(__dirname).input;
run(() => day01p1(input)); // 1007
