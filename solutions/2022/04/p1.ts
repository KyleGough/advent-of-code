import { getPuzzleInput } from '@utilities/getPuzzleInput';

export const day04p1 = (input: string) => {
  const lines = input.split('\n');

  const isFullyContained = (line: string) => {
    const [first, second] = line.split(',');

    const [firstMin, firstMax] = first.split('-').map((i) => Number(i));
    const [secondMin, secondMax] = second.split('-').map((i) => Number(i));

    return (
      (firstMin >= secondMin && firstMax <= secondMax) ||
      (secondMin >= firstMin && secondMax <= firstMax)
    );
  };

  return lines
    .map(isFullyContained)
    .reduce((prev, curr) => (curr ? prev + 1 : prev), 0);
};

const input = getPuzzleInput(__dirname).input;
console.log(day04p1(input)); // 456
