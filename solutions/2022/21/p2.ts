import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { MonkeyMap, parseMonkey, getValue } from './day21.helper';

// Check if a branch contains humn.
const branchHasHuman = (map: MonkeyMap, index: string): boolean => {
  if (index === 'humn') return true;

  const value = map[index];

  if (typeof value === 'number') return false;

  const operandA = value[0];
  const operandB = value[2];

  if (operandA === 'humn' || operandB === 'humn') return true;

  return branchHasHuman(map, operandA) || branchHasHuman(map, operandB);
};

const getHumanValue = (
  map: MonkeyMap,
  index: string,
  value: number
): number => {
  const [operandA, operator, operandB] = map[index] as string[];
  const branchAHuman = branchHasHuman(map, operandA);
  const humanBranch = branchAHuman ? operandA : operandB;
  const nonHumanBranch = branchAHuman ? operandB : operandA;
  const nonHumanValue = getValue(map, nonHumanBranch);
  let newValue;

  // Calculate human branch value.
  if (operator === '+') {
    newValue = value - nonHumanValue;
  } else if (operator === '-') {
    if (branchAHuman) {
      newValue = value + nonHumanValue;
    } else {
      newValue = nonHumanValue - value;
    }
  } else if (operator === '*') {
    newValue = value / nonHumanValue;
  } else {
    if (branchAHuman) {
      newValue = value * nonHumanValue;
    } else {
      newValue = nonHumanValue / value;
    }
  }

  if (humanBranch === 'humn') return newValue;

  return getHumanValue(map, humanBranch, newValue);
};

export const day21p2 = (input: string) => {
  const monkeys = input.split('\n');
  const monkeyMap: MonkeyMap = {};

  for (let i = 0; i < monkeys.length; i++) {
    const [name, job] = parseMonkey(monkeys[i]);
    monkeyMap[name] = job;
  }

  if (typeof monkeyMap['root'] === 'number')
    throw new Error('Unable to parse root.');

  const opA = monkeyMap['root'][0];
  const opB = monkeyMap['root'][2];
  const branchAHuman = branchHasHuman(monkeyMap, opA);
  const humanBranch = branchAHuman ? opA : opB;

  const rootMatchValue = branchAHuman
    ? getValue(monkeyMap, opB)
    : getValue(monkeyMap, opA);

  return getHumanValue(monkeyMap, humanBranch, rootMatchValue);
};

const input = getPuzzle(__dirname).input;
run(() => day21p2(input)); // 3373767893067
