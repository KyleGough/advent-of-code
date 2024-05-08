export interface RoundStats {
  hp: number;
  mana: number;
  bossHp: number;
  bossDamage: number;
  shield: number;
  poison: number;
  recharge: number;
  manaSpent: number;
}

export const parseBoss = (input: string) => {
  const stats = input.split('\n');
  const hp = stats[0].match(/Hit Points: (?<hp>\d+)/)?.groups;
  const damage = stats[1].match(/Damage: (?<damage>\d+)/)?.groups;

  if (!hp) throw new Error('Unable to parse hit points');
  if (!damage) throw new Error('Unable to parse damage');

  return [parseInt(hp.hp), parseInt(damage.damage)];
};

// Decrease effect timers for shield, poison, and recharge.
export const decreaseTimers = (stats: RoundStats) => {
  if (stats.shield > 0) {
    stats.shield--;
  }
  if (stats.poison > 0) {
    stats.bossHp -= 3;
    stats.poison--;
  }
  if (stats.recharge > 0) {
    stats.mana += 101;
    stats.recharge--;
  }

  return stats;
};

const calculateBossDamage = (stats: RoundStats, bossDamage: number): number =>
  stats.shield > 0 ? Math.max(1, bossDamage - 7) : bossDamage;

export const castSpells = (
  queue: RoundStats[],
  stats: RoundStats,
  minManaSpent: number
): number => {
  if (magicMissile(queue, stats, minManaSpent)) {
    minManaSpent = stats.manaSpent + 53;
  }
  if (drain(queue, stats, minManaSpent)) {
    minManaSpent = stats.manaSpent + 73;
  }
  shield(queue, stats);
  poison(queue, stats);
  recharge(queue, stats);

  return minManaSpent;
};

const magicMissile = (
  queue: RoundStats[],
  stats: RoundStats,
  minManaSpent: number
): boolean => {
  if (stats.mana < 53) return false;

  if (stats.bossHp > 4) {
    let nextStats = {
      ...stats,
      mana: stats.mana - 53,
      bossHp: stats.bossHp - 4,
      manaSpent: stats.manaSpent + 53,
    };
    nextStats = decreaseTimers(nextStats);
    nextStats.hp -= calculateBossDamage(nextStats, stats.bossDamage);
    if (nextStats.hp > 0) {
      queue.push(nextStats);
    }
  } else if (stats.manaSpent + 53 < minManaSpent) {
    return true;
  }

  return false;
};

const drain = (
  queue: RoundStats[],
  stats: RoundStats,
  minManaSpent: number
): boolean => {
  if (stats.mana < 73) return false;

  if (stats.bossHp > 2) {
    let nextStats = {
      ...stats,
      hp: stats.hp + 2,
      mana: stats.mana - 73,
      bossHp: stats.bossHp - 2,
      manaSpent: stats.manaSpent + 73,
    };
    nextStats = decreaseTimers(nextStats);
    nextStats.hp -= calculateBossDamage(nextStats, stats.bossDamage);
    if (nextStats.hp > 0) {
      queue.push(nextStats);
    }
  } else if (stats.manaSpent + 73 < minManaSpent) {
    return true;
  }

  return false;
};

const shield = (queue: RoundStats[], stats: RoundStats) => {
  if (stats.mana < 113 || stats.shield !== 0) return;

  let nextStats = {
    ...stats,
    mana: stats.mana - 113,
    shield: 6,
    manaSpent: stats.manaSpent + 113,
  };
  nextStats = decreaseTimers(nextStats);
  nextStats.hp -= calculateBossDamage(nextStats, stats.bossDamage);
  if (nextStats.hp > 0) {
    queue.push(nextStats);
  }
};

const poison = (queue: RoundStats[], stats: RoundStats) => {
  if (stats.mana < 173 || stats.poison !== 0) return;

  let nextStats = {
    ...stats,
    mana: stats.mana - 173,
    poison: 6,
    manaSpent: stats.manaSpent + 173,
  };
  nextStats = decreaseTimers(nextStats);
  nextStats.hp -= calculateBossDamage(nextStats, stats.bossDamage);
  if (nextStats.hp > 0) {
    queue.push(nextStats);
  }
};

const recharge = (queue: RoundStats[], stats: RoundStats) => {
  if (stats.mana < 229 || stats.recharge !== 0) return;

  let nextStats = {
    ...stats,
    mana: stats.mana - 229,
    recharge: 5,
    manaSpent: stats.manaSpent + 229,
  };
  nextStats = decreaseTimers(nextStats);
  nextStats.hp -= calculateBossDamage(nextStats, stats.bossDamage);
  if (nextStats.hp > 0) {
    queue.push(nextStats);
  }
};
