import { getPuzzle } from '@utilities/getPuzzle';

const getMemoryLength = (item: string): number => {
  // Strip double quotes.
  let convertedItem = item.slice(1, item.length - 1);

  // Replace \\
  convertedItem = convertedItem.replaceAll(/\\\\/g, '#');

  // Replace escaped double quotes.
  convertedItem = convertedItem.replaceAll(/\\"/g, '#');

  // Replace escaped special character.
  convertedItem = convertedItem.replaceAll(/\\x[a-f\d]{2}/g, '#');

  return convertedItem.length;
};

export const day08p1 = (input: string) => {
  const items = input.split('\n');
  const totalLiteralLength = items
    .map((i) => i.length)
    .reduce((prev, curr) => prev + curr, 0);
  const totalInMemoryLength = items
    .map(getMemoryLength)
    .reduce((prev, curr) => prev + curr, 0);

  return totalLiteralLength - totalInMemoryLength;
};

const input = getPuzzle(__dirname).input;
console.log(day08p1(input)); // 1371
