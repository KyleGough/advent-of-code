import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  roundStats,
  parseBoss,
  decreaseTimers,
  castSpells,
} from './day22.helper';

const simulate = (initialRound: roundStats) => {
  const queue: roundStats[] = [initialRound];
  let minManaSpent = Number.MAX_VALUE;

  while (queue.length) {
    let stats = queue.pop() as roundStats;

    // Branch pruning.
    if (stats.manaSpent > minManaSpent) {
      continue;
    }

    stats = decreaseTimers(stats);

    // Check if boss is dead.
    if (stats.bossHp <= 0) {
      if (stats.manaSpent < minManaSpent) {
        minManaSpent = stats.manaSpent;
      }
      continue;
    }

    // Not enough mana, lose.
    if (stats.mana < 53) {
      continue;
    }

    // Spells.
    minManaSpent = castSpells(queue, stats, minManaSpent);
  }

  return minManaSpent;
};

export const day22p1 = (input: string) => {
  const [bossHp, bossDamage] = parseBoss(input);

  return simulate({
    hp: 50,
    mana: 500,
    bossHp,
    bossDamage,
    shield: 0,
    poison: 0,
    recharge: 0,
    manaSpent: 0,
  });
};

const input = getPuzzle(__dirname).input; // 953
run(() => day22p1(input));
