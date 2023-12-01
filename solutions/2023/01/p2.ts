import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day01p2 = (input: string) => {
  return input.split('\n').map(getValue).reduce(sum);
};

const getValue = (input: string): number => {
  const firstDigit = getDigit(input, replacementMap);
  const lastDigit = getDigit(reverse(input), reverseReplacementMap);
  return parseInt(`${firstDigit}${lastDigit}`);
};

const reverse = (str: string): string => {
  return str.split('').reverse().join('');
};

const getDigit = (
  input: string,
  replacementMap: Record<string, string>
): string => {
  const length = input.length;

  for (let i = 0; i < length; i++) {
    if (input[i].match(/[0-9]/)) {
      return input[i];
    }

    const slicedInput = input.slice(i);

    for (const [key, value] of Object.entries(replacementMap)) {
      if (slicedInput.indexOf(key) === 0) {
        return value;
      }
    }
  }

  return '';
};

const reverseKeys = (map: Record<string, string>): Record<string, string> => {
  let reversedMap = {};
  for (const [key, value] of Object.entries(map)) {
    reversedMap = {
      ...reversedMap,
      [reverse(key)]: value,
    };
  }
  return reversedMap;
};

const replacementMap = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const reverseReplacementMap = reverseKeys(replacementMap);

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 54706
