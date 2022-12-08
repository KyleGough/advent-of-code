import { getPuzzle } from '@utilities/getPuzzle';

export const day03p2 = (input: string) => {
  const rucksacks = input.split('\n');
  let sumPriorities = 0;

  const isUpperCase = (char: string) => char === char.toUpperCase();

  const getPriority = (item: string) =>
    isUpperCase(item) ? item.charCodeAt(0) - 38 : item.charCodeAt(0) - 96;

  for (let i = 0; i < rucksacks.length; i += 3) {
    const rucksackA = new Set(rucksacks[i]);
    const rucksackB = new Set(rucksacks[i + 1]);
    const rucksackC = new Set(rucksacks[i + 2]);

    const [badge] = [...rucksackA].filter(
      (item) => rucksackB.has(item) && rucksackC.has(item)
    );

    sumPriorities += getPriority(badge);
  }

  return sumPriorities;
};

const input = getPuzzle(__dirname).input;
console.log(day03p2(input)); // 2758
