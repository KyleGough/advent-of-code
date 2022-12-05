import { readFileSync } from 'fs';
import { resolve } from 'path';

export const day04p2 = (input: string) => {
  const lines = input.split('\n');

  const isOverlap = (line: string) => {
    const [first, second] = line.split(',');

    const [firstMin, firstMax] = first.split('-').map((i) => Number(i));
    const [secondMin, secondMax] = second.split('-').map((i) => Number(i));

    return (
      (firstMax >= secondMin && firstMin <= secondMin) ||
      (secondMax >= firstMin && secondMin <= firstMin)
    );
  };

  return lines
    .map(isOverlap)
    .reduce((prev, curr) => (curr ? prev + 1 : prev), 0);
};

const input = readFileSync(resolve(__dirname, 'input'), 'utf-8');
console.log(day04p2(input)); // 808
