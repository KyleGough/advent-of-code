import { getPuzzle } from '@utilities/getPuzzle';
import { min } from '@utilities/reduce';
import { run } from '@utilities/run';
import { getSeeds, parseTriplet } from './day05.helper';

export const day05p1 = (input: string) => {
  const almanac = input.split('\n\n');
  const seeds = getSeeds(almanac[0]);
  const almanacMaps = almanac
    .slice(1)
    .map((i) => i.split('\n').slice(1).map(parseTriplet));

  return seeds.map((i) => getLocation(i, almanacMaps)).reduce(min);
};

const getLocation = (seed: number, almanacMaps: number[][][]): number => {
  const location = almanacMaps.reduce((prev, curr) => {
    for (let i = 0; i < curr.length; i++) {
      const [destStart, sourceStart, length] = curr[i];
      if (prev >= sourceStart && prev < sourceStart + length) {
        return prev - sourceStart + destStart;
      }
    }

    return prev;
  }, seed);

  return location;
};

const input = getPuzzle(__dirname).input;
run(() => day05p1(input)); // 525792406
