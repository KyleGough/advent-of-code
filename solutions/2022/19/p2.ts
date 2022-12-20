import { getPuzzle } from '@utilities/getPuzzle';
import { product } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseBlueprint, countGeodes } from './day19.helper';

export const day19p2 = (input: string) => {
  const blueprints = input.split('\n').slice(0, 3).map(parseBlueprint);
  console.log(blueprints.length);
  const geodeCounts = blueprints.map((i) => countGeodes(i, 32));
  return geodeCounts.reduce(product);
};

const input = getPuzzle(__dirname).example;
run(() => day19p2(input)); // 5394
