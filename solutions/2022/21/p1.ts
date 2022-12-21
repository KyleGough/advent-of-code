import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { MonkeyMap, parseMonkey, getValue } from './day21.helper';

export const day21p1 = (input: string) => {
  const monkeys = input.split('\n');
  const monkeyMap: MonkeyMap = {};

  for (let i = 0; i < monkeys.length; i++) {
    const [name, job] = parseMonkey(monkeys[i]);
    monkeyMap[name] = job;
  }

  return getValue(monkeyMap, 'root');
};

const input = getPuzzle(__dirname).input;
run(() => day21p1(input)); // 157714751182692
