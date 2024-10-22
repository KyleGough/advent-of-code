import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day04p2 = (input: string) => {
  const [min, max] = input.split('-').map(Number);
  let validCount = 0;

  for (let n = min; n <= max; n++) {
    if (isNumberValid(n.toString())) {
      validCount += 1;
    }
  }

  return validCount;
};

const isNumberValid = (num: string): boolean => {
  let adjacentCheck = false;

  for (let i = 0; i < num.length - 1; i++) {
    const value = num.charAt(i);
    const next = num.charAt(i + 1);

    if (parseInt(value) > parseInt(next)) {
      return false;
    }

    if (
      value === next &&
      (i - 1 < 0 || num.charAt(i - 1) !== value) &&
      (i + 2 >= num.length || num.charAt(i + 2) !== value)
    ) {
      adjacentCheck = true;
    }
  }

  return adjacentCheck;
};

const input = getPuzzle(__dirname).input;
run(() => day04p2(input)); // 1991
