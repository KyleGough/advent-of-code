import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day09p1 = (input: string) => {
  let decompressedLength = 0;
  let i = 0;

  while (i < input.length) {
    if (input[i] === '(') {
      const marker = input
        .slice(i)
        .match(/\((\d+)x(\d+)\)/) as RegExpMatchArray;
      const a = parseInt(marker[1]);
      const b = parseInt(marker[2]);
      const startIndex = (marker.index ?? 0) + marker[0].length;
      const repeatedSection = input.slice(i + startIndex, i + startIndex + a);
      decompressedLength += repeatedSection.length * b;
      i += startIndex + a;
    } else {
      decompressedLength++;
      i++;
    }
  }

  return decompressedLength;
};

const input = getPuzzle(__dirname).input;
run(() => day09p1(input)); // 150914
