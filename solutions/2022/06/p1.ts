import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

const markerLength = 4;

export const day06p1 = (input: string) => {
  for (let i = 0; i <= input.length - markerLength; i++) {
    if (new Set(input.slice(i, i + markerLength)).size === markerLength) {
      return i + markerLength;
    }
  }
};

const input = getPuzzle(__dirname).input;
run(() => day06p1(input)); // 1876
