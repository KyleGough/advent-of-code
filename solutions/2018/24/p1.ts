import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseArmy, simulateImmuneSystem } from './day24.helper';

export const day24p1 = (input: string) => {
  const [immuneBlock, infectionBlock] = input.split('\n\n');
  const units = parseArmy(immuneBlock).concat(parseArmy(infectionBlock));
  const victoryUnits = simulateImmuneSystem(units);
  return victoryUnits.map((u) => u.count).reduce(sum, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day24p1(input)); // 16747
