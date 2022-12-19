import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

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
  const totalLiteralLength = items.map((i) => i.length).reduce(sum);
  const totalInMemoryLength = items.map(getMemoryLength).reduce(sum);

  return totalLiteralLength - totalInMemoryLength;
};

const input = getPuzzle(__dirname).input;
run(() => day08p1(input)); // 1371
