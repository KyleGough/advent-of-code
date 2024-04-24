import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInput, passGeneration, getPlantPotCounts } from './day12.helper';

export const day12p2 = (input: string) => {
  const { state: initialState, rules } = parseInput(input);

  let state = [
    ...Array(4).fill(false),
    ...initialState,
    ...Array(4).fill(false),
  ];

  const generations = 50000000000;
  let count = 0;
  let diff = 0;
  let prevCount = 0;
  let prevDiff = 0;
  let currentGen = 1;

  while (currentGen <= generations) {
    state = passGeneration(state, rules);
    count = getPlantPotCounts(state, currentGen);
    diff = count - prevCount;
    if (diff === prevDiff) {
      break;
    }

    prevCount = count;
    prevDiff = diff;
    currentGen += 1;
  }

  const remGen = generations - currentGen;
  return count + remGen * diff;
};

const input = getPuzzle(__dirname).example;
run(() => day12p2(input)); // 1000000000508
