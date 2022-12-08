import { getPuzzle } from '@utilities/getPuzzle';

const markerLength = 14;

export const day06p2 = (input: string) => {
  for (let i = 0; i <= input.length - markerLength; i++) {
    if (new Set(input.slice(i, i + markerLength)).size === markerLength) {
      return i + markerLength;
    }
  }
};

const input = getPuzzle(__dirname).input;
console.log(day06p2(input)); // 2202
