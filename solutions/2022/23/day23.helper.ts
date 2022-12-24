export interface Point {
  x: number;
  y: number;
}

export const directionChecks = [
  // N, NE, NW
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: 1, y: -1 },
  // S, SE, SW
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: 1, y: 1 },
  // W, NW, SW
  { x: -1, y: 0 },
  { x: -1, y: -1 },
  { x: -1, y: 1 },
  // E, NE, SE
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 1, y: 1 },
];

export const parseElves = (input: string): Point[] => {
  const elfList: Point[] = [];
  const rows = input.split('\n');

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y].split('');
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '#') {
        elfList.push({ x, y });
      }
    }
  }

  return elfList;
};

export const createElfMap = (elves: Point[]) => {
  return new Set<string>(elves.map((elf) => pointToKey(elf)));
};

export const proposePosition = (
  elf: Point,
  elfMap: Set<string>,
  ruleOrder: number
): Point => {
  const directionCheckResult = directionChecks.map((i) =>
    neighbourExists({ x: elf.x + i.x, y: elf.y + i.y }, elfMap)
  );

  if (directionCheckResult.reduce((prev, curr) => prev || curr, false)) {
    for (let i = 0; i < 12; i += 3) {
      const neighbours =
        directionCheckResult[(ruleOrder + i) % 12] ||
        directionCheckResult[(ruleOrder + i + 1) % 12] ||
        directionCheckResult[(ruleOrder + i + 2) % 12];
      if (!neighbours) {
        return {
          x: elf.x + directionChecks[(ruleOrder + i) % 12].x,
          y: elf.y + directionChecks[(ruleOrder + i) % 12].y,
        };
      }
    }
  }

  return { x: elf.x, y: elf.y };
};

const neighbourExists = (elf: Point, elfMap: Set<string>): boolean => {
  return elfMap.has(pointToKey(elf));
};

const pointToKey = (point: Point): string =>
  point.x.toString() + ',' + point.y.toString();

export const checkDuplicates = (elves: Point[], nextElves: Point[]) => {
  const dupeSet: Record<string, number> = {};

  for (let i = 0; i < nextElves.length; i++) {
    const key = pointToKey(nextElves[i]);
    dupeSet[key] = dupeSet[key] ? dupeSet[key] + 1 : 1;
  }

  for (let i = 0; i < nextElves.length; i++) {
    const key = pointToKey(nextElves[i]);
    if (dupeSet[key] > 1) {
      nextElves[i] = { ...elves[i] };
    }
  }
};
