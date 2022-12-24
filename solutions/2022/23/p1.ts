import { getPuzzle } from '@utilities/getPuzzle';
import { max, min } from '@utilities/reduce';
import { run } from '@utilities/run';
import {
  Point,
  parseElves,
  createElfMap,
  proposePosition,
  checkDuplicates,
} from './day23.helper';

const boundingBoxArea = (points: Point[]): number => {
  const xValues = points.map((i) => i.x);
  const yValues = points.map((i) => i.y);
  const minX = xValues.reduce(min, Number.MAX_VALUE);
  const maxX = xValues.reduce(max);
  const minY = yValues.reduce(min, Number.MAX_VALUE);
  const maxY = yValues.reduce(max);
  return (maxX - minX + 1) * (maxY - minY + 1);
};

export const day23p1 = (input: string) => {
  let elves = parseElves(input);
  let nextElves: Point[];
  let ruleOrder = 0;
  const rounds = 10;

  for (let i = 0; i < rounds; i++) {
    nextElves = [];
    const elfMap = createElfMap(elves);

    // Find next position of every elf.
    for (let k = 0; k < elves.length; k++) {
      nextElves.push(proposePosition(elves[k], elfMap, ruleOrder));
    }

    // Find and revert duplicate proposed positions.
    checkDuplicates(elves, nextElves);

    elves = nextElves;
    ruleOrder = (ruleOrder + 3) % 12;
  }

  // Calculate number of empty ground tiles.
  const emptyTiles = boundingBoxArea(elves) - elves.length;

  return emptyTiles;
};

const input = getPuzzle(__dirname).input; // 3815
run(() => day23p1(input));
