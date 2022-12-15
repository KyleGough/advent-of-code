import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day04p2 = (input: string) => {
  const lines = input.split('\n');

  const isOverlap = (line: string) => {
    const [first, second] = line.split(',');

    const [firstMin, firstMax] = first.split('-').map((i) => parseInt(i));
    const [secondMin, secondMax] = second.split('-').map((i) => parseInt(i));

    return (
      (firstMax >= secondMin && firstMin <= secondMin) ||
      (secondMax >= firstMin && secondMin <= firstMin)
    );
  };

  return lines
    .map(isOverlap)
    .reduce((prev, curr) => (curr ? prev + 1 : prev), 0);
};

const input = getPuzzle(__dirname).input;
run(() => day04p2(input)); // 808
