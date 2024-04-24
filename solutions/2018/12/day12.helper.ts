/**
 * Perform replacement rules and append empty pot to start and end of new state.
 */
export const passGeneration = (
  state: boolean[],
  rules: Record<string, boolean>
) => {
  const nextState = [];
  for (let j = 0; j < state.length; j++) {
    const a = state?.[j - 2] ?? false;
    const b = state?.[j - 1] ?? false;
    const c = state[j];
    const d = state[j + 1] ?? false;
    const e = state[j + 2] ?? false;
    const slice = [a, b, c, d, e];
    const sliceStr = slice.map((s) => (s ? '#' : '.')).join('');
    nextState.push(rules[sliceStr] ?? false);
  }

  return [false, ...nextState, false];
};

/**
 * Sum indexes that have plant pots.
 */
export const getPlantPotCounts = (state: boolean[], gen: number): number => {
  const rootIndex = -4 - gen;
  let sum = 0;

  for (let i = 0; i < state.length; i++) {
    if (state[i]) {
      sum += rootIndex + i;
    }
  }

  return sum;
};

interface PlantGeneration {
  state: boolean[];
  rules: Record<string, boolean>;
}

export const parseInput = (input: string): PlantGeneration => {
  const [stateStr, rulesStr] = input.split('\n\n');

  const rules = rulesStr.split('\n').reduce((prev, curr) => {
    const [pattern, result] = curr.split(' => ');
    return {
      ...prev,
      [pattern]: result === '#',
    };
  }, {});

  const state = stateStr
    .split(':')[1]
    .trim()
    .split('')
    .map((i) => i === '#');

  return { state, rules };
};
