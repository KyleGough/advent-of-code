import { any, sum } from '@utilities/reduce';

interface Coord {
  x: number;
  y: number;
}

interface DistanceCoord extends Coord {
  distance: number;
}

interface Unit extends Coord {
  type: 'G' | 'E';
  hp: number;
}

const isUnitType = (cell: string): cell is 'G' | 'E' => {
  return cell === 'G' || cell === 'E';
};

/**
 * Finds all the units from the grid. Units are given 200 hp and 3 attack power.
 */
const findUnits = (grid: string[][]): Unit[] => {
  const units: Unit[] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = grid[y][x];
      if (isUnitType(cell)) {
        units.push({
          type: cell,
          x,
          y,
          hp: 200,
        });
      }
    }
  }

  return units;
};

/**
 * Sorts by reading order, top to bottom, left to right.
 */
const sortByReadingOrder = <T extends Coord>(units: T[]): T[] => {
  return units.sort((a, b) => {
    if (a.y < b.y) return -1;
    if (b.y < a.y) return 1;
    if (a.x < b.x) return -1;
    if (b.x < a.x) return 1;
    return 0;
  });
};

/**
 * Get array of four adjacent coords to given origin.
 */
const getAdjacentCoords = <T extends Coord>(origin: T): Coord[] => {
  return [
    { x: origin.x, y: origin.y - 1 },
    { x: origin.x, y: origin.y + 1 },
    { x: origin.x - 1, y: origin.y },
    { x: origin.x + 1, y: origin.y },
  ];
};

/**
 * Returns a list of target coords that are adjacent to units of the opposite type.
 * Does not account for reachability from the attacker unit.
 */
const identifyTargets = (
  attacker: Unit,
  units: Unit[],
  grid: string[][]
): DistanceCoord[] => {
  const [reachableCells, distances] = bfs(attacker, grid);
  const targets: Coord[] = [];

  const filteredUnits = units.filter(
    (u) => u.x !== attacker.x || u.y !== attacker.y
  );

  for (const target of filteredUnits) {
    const adjacentCells = getAdjacentCoords(target);

    for (const coord of adjacentCells) {
      const { x, y } = coord;
      const cell = grid?.[y]?.[x];
      if (cell === '.' && reachableCells.has(coordToString(coord))) {
        targets.push({
          x,
          y,
        });
      }
    }
  }

  return targets.map((t) => ({
    ...t,
    distance: distances[coordToString(t)],
  }));
};

/**
 * Is a unit of the opposite type adjacent to the attacking unit.
 */
const isAttackRange = (attacker: Unit, grid: string[][]): boolean => {
  const targetType = attacker.type === 'G' ? 'E' : 'G';
  return getAdjacentCoords(attacker)
    .map((c) => grid?.[c.y]?.[c.x] === targetType)
    .reduce(any);
};

/**
 * Returns the target coord with the least distance.
 * For coords with the same distance, reading order is used.
 */
const pickTarget = (targets: DistanceCoord[]): DistanceCoord => {
  const sortedTargets = sortByReadingOrder(targets).sort((a, b) => {
    if (a.distance < b.distance) return -1;
    if (b.distance < a.distance) return 1;
    return 0;
  });

  return sortedTargets[0];
};

/**
 * Pick a target that is adjacent to the attacker, has the lowest hp.
 * For targets with matching hp, pick using reading order.
 */
const pickAttackTarget = (attacker: Unit, units: Unit[]): Unit | undefined => {
  const targetUnits = units.filter((u) => {
    return Math.abs(attacker.x - u.x) + Math.abs(attacker.y - u.y) === 1;
  });

  return sortByReadingOrder(targetUnits).sort((a, b) => {
    if (a.hp < b.hp) return -1;
    if (b.hp < a.hp) return 1;
    return 0;
  })[0];
};

const attackTarget = (
  attacker: Unit,
  units: Unit[],
  grid: string[][],
  elfPower = 3
) => {
  const attackTarget = pickAttackTarget(attacker, units);
  if (attackTarget) {
    attackTarget.hp -= attacker.type === 'E' ? elfPower : 3;
    if (attackTarget.hp <= 0) {
      grid[attackTarget.y][attackTarget.x] = '.';
    }
  }
};

/**
 * Performs a breadth-first search from the origin.
 * Returns the visited cells and distances from the origin.
 */
const bfs = (
  origin: Coord,
  grid: string[][]
): [Set<string>, Record<string, number>] => {
  const visited = new Set<string>();
  let currentQueue: DistanceCoord[] = [{ ...origin, distance: 1 }];
  let nextQueue: DistanceCoord[] = [];
  const distances: Record<string, number> = {};

  while (currentQueue.length) {
    for (const coord of currentQueue) {
      const coordString = coordToString(coord);
      visited.add(coordString);

      if (!distances[coordString] || coord.distance < distances[coordString]) {
        distances[coordString] = coord.distance;
      } else {
        continue;
      }

      const adjacent = getAdjacentCoords(coord);

      adjacent.forEach((adjacentCoord) => {
        // Add adjacent coord to queue if unvisited and is an open cavern.
        const adjacentCoordString = coordToString(adjacentCoord);
        if (!visited.has(adjacentCoordString)) {
          const cell = grid?.[adjacentCoord.y]?.[adjacentCoord.x];
          if (cell === '.') {
            nextQueue.push({ ...adjacentCoord, distance: coord.distance + 1 });
          }
        }
      });
    }

    currentQueue = nextQueue;
    nextQueue = [];
  }

  return [visited, distances];
};

/**
 * Moves the unit one cell towards a chosen target.
 */
const moveUnit = (unit: Unit, targets: DistanceCoord[], grid: string[][]) => {
  const target = pickTarget(targets);
  const [, distances] = bfs(target, grid);
  const adjacentToAttacker = getAdjacentCoords(unit);
  const filteredCoords = adjacentToAttacker.filter(
    (coord) => !!distances[coordToString(coord)]
  );

  const distanceCoords = filteredCoords.map((coord) => ({
    ...coord,
    distance: distances[coordToString(coord)],
  }));

  const selectedCell = sortByReadingOrder(distanceCoords).sort((a, b) => {
    if (a.distance < b.distance) return -1;
    if (b.distance < a.distance) return 1;
    return 0;
  })[0];

  // Move the unit on the grid and update the unit object.
  grid[unit.y][unit.x] = '.';
  grid[selectedCell.y][selectedCell.x] = unit.type;
  unit.x = selectedCell.x;
  unit.y = selectedCell.y;
};

/**
 * Converts a coord to a string in the form "x,y"
 */
const coordToString = <T extends Coord>(coord: T): string => {
  return `${coord.x},${coord.y}`;
};

/**
 * If one unit type is wiped out then combat is ended.
 */
const isCombatEnded = (units: Unit[]): boolean => {
  const types = units.filter((u) => u.hp > 0).map((u) => u.type);
  const goblins = types.filter((u) => u === 'G');
  const elves = types.filter((u) => u === 'E');
  return goblins.length === 0 || elves.length === 0;
};

/**
 * Checks if any elf units have died.
 */
const hasElfDied = (units: Unit[]) => {
  return units.findIndex((u) => u.type === 'E' && u.hp <= 0) >= 0;
};

/**
 * Simulate combat scenario with given elf attack power.
 * Stops once all units of a particular type have been defeated.
 */
export const simulateCombat = (
  input: string,
  elfPower = 3,
  returnEarlyOnElfDeath = false
) => {
  const grid = input.split('\n').map((r) => r.split(''));
  let units = sortByReadingOrder(findUnits(grid));
  let round = 0;
  let combatEnded = false;

  while (!isCombatEnded(units)) {
    for (const attacker of units) {
      // Skip turn for dead units.
      if (attacker.hp <= 0) continue;

      const enemyUnits = units.filter(
        (u) => u.hp > 0 && u.type !== attacker.type
      );

      if (isCombatEnded(units)) {
        combatEnded = true;
        continue;
      }

      // Find reachable targets.
      const targets = identifyTargets(attacker, enemyUnits, grid);

      // Move unit towards a selected target.
      if (!isAttackRange(attacker, grid) && targets.length) {
        moveUnit(attacker, targets, grid);
      }

      // Attacks a chosen target if in range.
      if (isAttackRange(attacker, grid)) {
        attackTarget(attacker, enemyUnits, grid, elfPower);
      }
    }

    // Early quit the simulation if any elf has died.
    if (returnEarlyOnElfDeath && hasElfDied(units)) {
      return false;
    }

    units = sortByReadingOrder(units.filter((u) => u.hp > 0));
    if (!combatEnded) {
      round += 1;
    }
  }

  const totalHp = units.map((u) => u.hp).reduce(sum);
  return round * totalHp;
};
