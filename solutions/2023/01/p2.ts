import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day01p2 = (input: string) => {
  return input.split('\n').map(getValue).reduce(sum);
};

const getValue = (input: string): number => {
  const firstDigit = getDigit(input, numbers);
  const lastDigit = getDigit(
    reverse(input),
    numbers.map((i) => reverse(i))
  );
  return parseInt(`${firstDigit}${lastDigit}`);
};

const reverse = (str: string): string => {
  return str.split('').reverse().join('');
};

const getDigit = (input: string, numbers: string[]): string | number => {
  const length = input.length;

  for (let i = 0; i < length; i++) {
    if (input[i].match(/[0-9]/)) {
      return input[i];
    }

    const slicedInput = input.slice(i);

    for (let j = 0; j < numbers.length; j++) {
      if (slicedInput.indexOf(numbers[j]) === 0) {
        return j;
      }
    }
  }

  return '';
};

const numbers = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 54706
