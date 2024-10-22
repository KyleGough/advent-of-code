import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day04p1 = (input: string) => {
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
  for (let i = 0; i < num.length - 1; i++) {
    if (parseInt(num.charAt(i)) > parseInt(num.charAt(i + 1))) {
      return false;
    }
  }

  return /(\d)\1/.test(num);
};

const input = getPuzzle(__dirname).input;
run(() => day04p1(input)); // 2814
