import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day03p1 = (input: string) => {
  const rucksacks = input.split('\n');

  const getWrongItem = (rucksack: string) => {
    const first = new Set(rucksack.split('').splice(0, rucksack.length / 2));
    const second = new Set(rucksack.split('').splice(rucksack.length / 2));
    const intersect = new Set([...first].filter((i) => second.has(i)));
    const [wrongItem] = intersect;
    return wrongItem;
  };

  const isUpperCase = (char: string) => char === char.toUpperCase();

  const getPriority = (item: string) =>
    isUpperCase(item) ? item.charCodeAt(0) - 38 : item.charCodeAt(0) - 96;

  const priorities = rucksacks.map(getWrongItem).map(getPriority);

  return priorities.reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day03p1(input)); // 7553
