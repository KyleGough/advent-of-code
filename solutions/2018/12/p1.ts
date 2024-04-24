import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInput, passGeneration, getPlantPotCounts } from './day12.helper';

export const day12p1 = (input: string) => {
  const { state: initialState, rules } = parseInput(input);

  let state = [
    ...Array(4).fill(false),
    ...initialState,
    ...Array(4).fill(false),
  ];

  const generations = 20;

  for (let i = 1; i <= generations; i++) {
    state = passGeneration(state, rules);
  }

  return getPlantPotCounts(state, 20);
};

const input = getPuzzle(__dirname).input;
run(() => day12p1(input)); // 1733
