import { sum } from '@utilities/reduce';

export class Unit {
  id: string;
  count = 0;
  hp = 0;
  attackDamage = 0;
  attackType = '';
  initiative = 0;
  immunity: Set<string> = new Set();
  weakness: Set<string> = new Set();
  allegiance: string;
  target = '';
  targetted = false;

  constructor(id: string, allegiance: string) {
    this.id = id;
    this.allegiance = allegiance;
  }

  getEffectivePower() {
    return Math.max(this.count, 0) * this.attackDamage;
  }

  getDamage(target: Unit): number {
    const power = this.getEffectivePower();

    // If target is immune, deal no damage.
    if (target.immunity.has(this.attackType)) {
      return 0;
    }

    // If target is weak, deal double damage..
    if (target.weakness.has(this.attackType)) {
      return power * 2;
    }

    return power;
  }

  receiveDamage(power: number) {
    const deaths = Math.floor(power / this.hp);
    this.count -= deaths;
  }

  attack(target: Unit) {
    target.receiveDamage(this.getDamage(target));
  }

  clearTarget() {
    this.targetted = false;
    this.target = '';
  }
}

const parseUnit = (
  input: string,
  allegiance: string,
  index: number,
  boost: number
): Unit => {
  const count = input.match(/(\d+) units/)?.[1];
  const hp = input.match(/(\d+) hit points/)?.[1];
  const attackDamage = input.match(/does (\d+)/)?.[1];
  const attackType = input.match(/does \d+ (\w+) damage/)?.[1];
  const initiative = input.match(/initiative (\d+)/)?.[1];
  const immunity = input.match(/immune to (\w+[, \w+]+)/)?.[1];
  const weakness = input.match(/weak to (\w+[, \w+]+)/)?.[1];

  if (!count || !hp || !attackDamage || !attackType || !initiative) {
    throw new Error('Unable to parse unit');
  }

  const army = new Unit(`${allegiance}-${index}`, allegiance);
  army.count = parseInt(count);
  army.hp = parseInt(hp);
  army.attackDamage = parseInt(attackDamage) + boost;
  army.attackType = attackType;
  army.initiative = parseInt(initiative);
  army.immunity = new Set(immunity?.split(', ') ?? []);
  army.weakness = new Set(weakness?.split(', ') ?? []);

  return army;
};

export const parseArmy = (input: string, boost = 0): Unit[] => {
  const lines = input.split('\n');
  const allegiance = lines[0].match(/^\w+/)?.[0];

  if (!allegiance) {
    throw new Error('Unable to parse army');
  }

  return lines.slice(1).map((unit, i) => parseUnit(unit, allegiance, i, boost));
};

export const simulateImmuneSystem = (units: Unit[]): Unit[] => {
  const unitMap: Record<string, Unit> = units.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.id]: curr,
    }),
    {}
  );

  let currentCount;

  do {
    // Calculate total count changes in case of stalemate.
    currentCount = units.map(({ count }) => count).reduce(sum, 0);

    // Sort units by effective power.
    units = units.sort(compareUnitPower);

    // Target selection phase.
    for (const attackUnit of units) {
      const targets = units.filter((u) => isValidTarget(attackUnit, u));
      targets.sort((a, b) => compareTarget(attackUnit, a, b));
      const bestTarget = targets.length && targets[0];

      if (bestTarget && attackUnit.getDamage(bestTarget) > 0) {
        attackUnit.target = bestTarget.id;
        bestTarget.targetted = true;
      }
    }

    // Sort units by initiative.
    units = units.sort(compareUnitInitiative);

    // Attack phase.
    for (const attackUnit of units) {
      if (!attackUnit.target) continue;
      if (attackUnit.count <= 0) continue;

      const target = unitMap[attackUnit.target];
      attackUnit.attack(target);
    }

    // Prune defeated units.
    units = units.filter((u) => u.count > 0);

    // Reset targets.
    for (const unit of units) {
      unit.clearTarget();
    }
  } while (continueBattle(units, currentCount));

  return units;
};

const continueBattle = (units: Unit[], previousCount: number): boolean => {
  const allegiances = units.map(({ allegiance }) => allegiance);
  const totalCount = units.map(({ count }) => count).reduce(sum, 0);
  return new Set(allegiances).size > 1 && totalCount < previousCount;
};

const compareUnitPower = (unitA: Unit, unitB: Unit): number => {
  return unitB.getEffectivePower() - unitA.getEffectivePower();
};

const compareUnitInitiative = (unitA: Unit, unitB: Unit): number => {
  return unitB.initiative - unitA.initiative;
};

const compareTarget = (attackUnit: Unit, unitA: Unit, unitB: Unit) => {
  const damageA = attackUnit.getDamage(unitA);
  const damageB = attackUnit.getDamage(unitB);

  if (damageA < damageB) return 1;
  if (damageB < damageA) return -1;

  const powerA = unitA.getEffectivePower();
  const powerB = unitB.getEffectivePower();

  if (powerA < powerB) return 1;
  if (powerB < powerA) return -1;

  if (unitA.initiative < unitB.initiative) return 1;
  if (unitB.initiative < unitA.initiative) return -1;
  return 0;
};

const isValidTarget = (attackUnit: Unit, target: Unit) => {
  return (
    target.id !== attackUnit.id &&
    target.allegiance !== attackUnit.allegiance &&
    !target.targetted
  );
};
