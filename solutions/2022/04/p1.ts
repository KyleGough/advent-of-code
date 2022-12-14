import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

const isFullyContained = (line: string) => {
  const [first, second] = line.split(',');

  const [firstMin, firstMax] = first.split('-').map((i) => parseInt(i));
  const [secondMin, secondMax] = second.split('-').map((i) => parseInt(i));

  return (
    (firstMin >= secondMin && firstMax <= secondMax) ||
    (secondMin >= firstMin && secondMax <= firstMax)
  );
};

export const day04p1 = (input: string) =>
  input
    .split('\n')
    .map(isFullyContained)
    .reduce((prev, curr) => (curr ? prev + 1 : prev), 0);

const input = getPuzzle(__dirname).input;
run(() => day04p1(input)); // 456
