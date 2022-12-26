import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day25p1 = (input: string) => {
  const value = input.split('\n').map(snafuToDecimal).reduce(sum);
  return decimalToSnafu(value);
};

const decimalToSnafu = (value: number): string => {
  const digit = value % 5;
  let remainder = (value - digit) / 5;
  let currentDigit;

  switch (digit) {
    case 2:
    case 1:
    case 0:
      currentDigit = digit.toString();
      break;
    case 3:
      currentDigit = '=';
      remainder++;
      break;
    default:
      currentDigit = '-';
      remainder++;
      break;
  }

  const nextDigits = remainder > 0 ? decimalToSnafu(remainder) : '';

  return nextDigits + currentDigit;
};

const snafuToDecimal = (input: string): number => {
  const snafu = input.split('').reverse();
  let total = 0;

  for (let i = 0; i < snafu.length; i++) {
    switch (snafu[i]) {
      case '2':
        total += 2 * 5 ** i;
        break;
      case '1':
        total += 5 ** i;
        break;
      case '-':
        total -= 5 ** i;
        break;
      case '=':
        total -= 2 * 5 ** i;
        break;
    }
  }

  return total;
};

const input = getPuzzle(__dirname).input;
run(() => day25p1(input)); //2=0--0---11--01=-100
