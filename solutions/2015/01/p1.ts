import { getPuzzle } from '@utilities/getPuzzle';

export const day01p1 = (input: string) => {
  return input
    .split('')
    .reduce((prev, curr) => (curr === '(' ? prev + 1 : prev - 1), 0);
};

const input = getPuzzle(__dirname).input;
console.log(day01p1(input)); // 232
