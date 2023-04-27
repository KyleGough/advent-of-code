import { modulo } from '@utilities/modulo';

export const matchSum = (digits: number[], offset = 1): number => {
  const digitCount = digits.length;

  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    if (digits[modulo(i + offset, digitCount)] === digits[i]) {
      sum += digits[i];
    }
  }

  return sum;
};
