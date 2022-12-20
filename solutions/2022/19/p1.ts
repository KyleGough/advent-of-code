import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseBlueprint, countGeodes } from './day19.helper';

export const day19p1 = (input: string) => {
  const blueprints = input.split('\n').map(parseBlueprint);
  const geodeCounts = blueprints.map((i) => countGeodes(i, 24));
  const qualityLevels = geodeCounts.map((count, i) => count * (i + 1));
  return qualityLevels.reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day19p1(input)); // 1681
