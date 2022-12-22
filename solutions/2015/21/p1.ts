import { getPuzzle } from '@utilities/getPuzzle';
import { min } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseBoss, getItemCombos, fightBoss } from './day21.helper';

export const day21p1 = (input: string) => {
  const boss = parseBoss(input);
  const itemCombos = getItemCombos();
  const winningFights = itemCombos.filter((i) => fightBoss(boss, i));
  const winningCosts = winningFights.map((i) => i.cost);
  return winningCosts.reduce(min);
};

const input = getPuzzle(__dirname).input;
run(() => day21p1(input)); // 121
