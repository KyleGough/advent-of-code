import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { permutations } from '@utilities/permutations';
import { getArrangementMap, getPermutationHappiness } from './day13.helper';

export const day13p1 = (input: string) => {
  const arrangementMap = getArrangementMap(input);
  const people = Object.keys(arrangementMap);
  const peoplePermutations = permutations(people);

  return Math.max(
    ...peoplePermutations.map((i) => getPermutationHappiness(arrangementMap, i))
  );
};

const input = getPuzzle(__dirname).input;
run(() => day13p1(input)); // 709
