import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { permutations } from '@utilities/permutations';
import { getArrangementMap, getPermutationHappiness } from './day13.helper';

export const day13p2 = (input: string) => {
  const arrangementMap = getArrangementMap(input);
  const people = Object.keys(arrangementMap);
  const newPerson = 'You';

  // Add yourself to the arrangement map.
  arrangementMap[newPerson] = {};
  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    arrangementMap[person][newPerson] = 0;
    arrangementMap[newPerson][person] = 0;
  }

  const peoplePermutations = permutations([...people, newPerson]);

  return peoplePermutations
    .map((i) => getPermutationHappiness(arrangementMap, i))
    .reduce((prev, curr) => Math.max(prev, curr), 0);
};

const input = getPuzzle(__dirname).input;
run(() => day13p2(input)); // 668
