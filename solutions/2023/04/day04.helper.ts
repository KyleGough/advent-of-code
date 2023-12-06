import { matchNumbers } from '@utilities/stringMatch';

export const getCardMatches = (line: string): number => {
  const data = line.split(':')[1];
  const winningNumbers = matchNumbers(data.split('|')[0]);
  const numbers = matchNumbers(data.split('|')[1]);

  return (
    winningNumbers.length +
    numbers.length -
    new Set([...winningNumbers, ...numbers]).size
  );
};
