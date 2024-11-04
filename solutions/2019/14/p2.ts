import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getOreCount, parseReactions } from './day14.helper';

export const day14p2 = (input: string) => {
  const reactions = parseReactions(input);
  const singleFuelCost = getOreCount(reactions);
  const oreCount = 1_000_000_000_000;
  const lowerBound = Math.ceil(oreCount / singleFuelCost);

  let fuelCount = lowerBound;
  let remaining = oreCount;

  while (remaining > singleFuelCost) {
    remaining = oreCount - getOreCount(reactions, fuelCount);
    fuelCount += Math.floor(remaining / singleFuelCost);
  }

  return fuelCount;
};

const input = getPuzzle(__dirname).input;
run(() => day14p2(input)); // 3126714
