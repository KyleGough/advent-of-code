import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  Point,
  parseElves,
  createElfMap,
  proposePosition,
  checkDuplicates,
} from './day23.helper';

export const day23p2 = (input: string) => {
  let elves = parseElves(input);
  let nextElves: Point[];
  let ruleOrder = 0;
  let elvesFixed = false;
  let round = 0;

  while (!elvesFixed) {
    nextElves = [];
    const elfMap = createElfMap(elves);

    // Find next position of every elf.
    for (let k = 0; k < elves.length; k++) {
      const proposedPos = proposePosition(elves[k], elfMap, ruleOrder);
      nextElves.push(proposedPos);
    }

    // Find and revert duplicate proposed positions.
    checkDuplicates(elves, nextElves);

    let fixedCount = 0;
    for (let p = 0; p < elves.length; p++) {
      if (elves[p].x === nextElves[p].x && elves[p].y === nextElves[p].y) {
        fixedCount++;
      }
    }

    // Check if all elves haven't moved.
    if (fixedCount === nextElves.length) {
      elvesFixed = true;
    }

    elves = nextElves;
    ruleOrder = (ruleOrder + 3) % 12;
    round++;
  }

  return round;
};

const input = getPuzzle(__dirname).input; // 893
run(() => day23p2(input));
