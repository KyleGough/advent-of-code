import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseArmy, simulateImmuneSystem, Unit } from './day24.helper';
import { sum } from '@utilities/reduce';

export const day24p2 = (input: string) => {
  const [immuneBlock, infectionBlock] = input.split('\n\n');

  let boost = 1;
  let immuneVictory = false;
  let units: Unit[] = [];

  while (!immuneVictory) {
    const immuneArmy = parseArmy(immuneBlock, boost++);
    const infectionArmy = parseArmy(infectionBlock);
    units = simulateImmuneSystem([...immuneArmy, ...infectionArmy]);
    const allegiances = new Set(units.map(({ allegiance }) => allegiance));

    if (allegiances.size === 1 && allegiances.has('Immune')) {
      immuneVictory = true;
    }
  }

  return units.map(({ count }) => count).reduce(sum, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day24p2(input)); // 5923
