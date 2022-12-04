import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputData = readFileSync(resolve(__dirname, 'input'), 'utf-8');
const lines = inputData.split('\n');

const isOverlap = (line: string) => {
  const [first, second] = line.split(',');

  const [firstMin, firstMax] = first.split('-').map((i) => Number(i));
  const [secondMin, secondMax] = second.split('-').map((i) => Number(i));

  return (
    (firstMax >= secondMin && firstMin <= secondMin) ||
    (secondMax >= firstMin && secondMin <= firstMin)
  );
};

const output = lines
  .map(isOverlap)
  .reduce((prev, curr) => (curr ? prev + 1 : prev), 0);

console.log(output);
