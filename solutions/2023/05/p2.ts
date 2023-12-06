import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { matchNumbers } from '@utilities/stringMatch';

export const day05p2 = (input: string) => {
  const almanac = input.split('\n\n');
  const seeds = matchNumbers(almanac[0]);
  const almanacMaps = almanac
    .slice(1)
    .map((i) => i.split('\n').slice(1).map(matchNumbers));

  let minLocation = Number.MAX_SAFE_INTEGER;

  while (seeds.length) {
    const start = seeds.shift() as number;
    const range = seeds.shift() as number;
    const end = start + range - 1;
    let currentSeed = start;

    while (currentSeed <= end) {
      const [location, displacement] = getLocation(currentSeed, almanacMaps);
      currentSeed += displacement;
      minLocation = Math.min(minLocation, location);
    }
  }

  return minLocation;
};

const getLocation = (seed: number, almanacMaps: number[][][]): number[] => {
  let maxLength = Number.MAX_SAFE_INTEGER;

  const location = almanacMaps.reduce((prev, curr) => {
    let maxNextSource = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < curr.length; i++) {
      const [destStart, sourceStart, length] = curr[i];
      if (prev >= sourceStart && prev < sourceStart + length) {
        maxLength = Math.min(maxLength, sourceStart + length - prev);
        return prev - sourceStart + destStart;
      }
    }

    for (let i = 0; i < curr.length; i++) {
      const sourceStart = curr[i][1];
      if (
        sourceStart > prev &&
        sourceStart - 1 < Math.min(maxNextSource, sourceStart)
      ) {
        maxNextSource = sourceStart - 1;
      }
    }

    maxLength = Math.min(maxLength, maxNextSource - prev + 1);
    return prev;
  }, seed);

  return [location, maxLength];
};

const input = getPuzzle(__dirname).input;
run(() => day05p2(input)); // 79004094
