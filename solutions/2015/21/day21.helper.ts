import { sum } from '@utilities/reduce';

interface ShopItem {
  cost: number;
  damage: number;
  armour: number;
}

interface Boss {
  hp: number;
  damage: number;
  armour: number;
}

const weapons = [
  { cost: 8, damage: 4, armour: 0 },
  { cost: 10, damage: 5, armour: 0 },
  { cost: 25, damage: 6, armour: 0 },
  { cost: 40, damage: 7, armour: 0 },
  { cost: 74, damage: 8, armour: 0 },
];

const armours = [
  { cost: 0, damage: 0, armour: 0 },
  { cost: 13, damage: 0, armour: 1 },
  { cost: 31, damage: 0, armour: 2 },
  { cost: 53, damage: 0, armour: 3 },
  { cost: 75, damage: 0, armour: 4 },
  { cost: 102, damage: 0, armour: 5 },
];

const rings = [
  { cost: 0, damage: 0, armour: 0 },
  { cost: 25, damage: 1, armour: 0 },
  { cost: 50, damage: 2, armour: 0 },
  { cost: 100, damage: 3, armour: 0 },
  { cost: 20, damage: 0, armour: 1 },
  { cost: 40, damage: 0, armour: 2 },
  { cost: 80, damage: 0, armour: 3 },
  { cost: 0, damage: 0, armour: 0 },
];

export const parseBoss = (input: string): Boss => {
  const [hp, damage, armour] = input.split('\n');

  return {
    hp: parseInt(hp.split(': ')[1]),
    damage: parseInt(damage.split(': ')[1]),
    armour: parseInt(armour.split(': ')[1]),
  };
};

export const getItemCombos = (): ShopItem[] => {
  const itemCombos: ShopItem[] = [];

  // Iterate through item combos.
  // 1 weapon, 0-1 armour, 0-2 rings.
  for (let w = 0; w < weapons.length; w++) {
    for (let a = 0; a < armours.length; a++) {
      for (let r1 = 0; r1 < rings.length - 1; r1++) {
        for (let r2 = 1; r2 < rings.length; r2++) {
          if (r1 === r2) continue;

          const items = [weapons[w], armours[a], rings[r1], rings[r2]];
          itemCombos.push({
            cost: items.map((i) => i.cost).reduce(sum),
            damage: items.map((i) => i.damage).reduce(sum),
            armour: items.map((i) => i.armour).reduce(sum),
          });
        }
      }
    }
  }

  return itemCombos;
};

export const fightBoss = (boss: Boss, shopItem: ShopItem): boolean => {
  const attackerDamage = Math.max(1, shopItem.damage - boss.armour);
  const bossDamage = Math.max(1, boss.damage - shopItem.armour);
  const bossTurns = Math.ceil(100 / bossDamage);
  const attackerTurns = Math.ceil(boss.hp / attackerDamage);
  return bossTurns >= attackerTurns;
};
