import { getPuzzle } from '@utilities/getPuzzle';
import { max } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseBoss, getItemCombos, fightBoss } from './day21.helper';

export const day21p2 = (input: string) => {
  const boss = parseBoss(input);
  const itemCombos = getItemCombos();
  const losingFights = itemCombos.filter((i) => !fightBoss(boss, i));
  const losingCosts = losingFights.map((i) => i.cost);
  return losingCosts.reduce(max);
};

const input = getPuzzle(__dirname).input;
run(() => day21p2(input)); // 201
