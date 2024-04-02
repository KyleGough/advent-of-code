import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getReducedPolymerLength } from './day05.helper';

export const day05p2 = (input: string) => {
  const originalPolymer = input.split('');
  const uniqueChars = [...new Set(input.toUpperCase().split(''))];
  let minimumLength = Number.MAX_SAFE_INTEGER;

  uniqueChars.forEach((char: string) => {
    const filteredPolymer = originalPolymer.filter(
      (i) => i.toUpperCase() !== char
    );
    const polymerLength = getReducedPolymerLength(filteredPolymer.join(''));
    if (polymerLength < minimumLength) {
      minimumLength = polymerLength;
    }
  });

  return minimumLength;
};

const input = getPuzzle(__dirname).input;
run(() => day05p2(input)); // 5278
