import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputData = readFileSync(resolve(__dirname, 'input'), 'utf-8');
const rucksacks = inputData.split('\n');
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

console.log(sumPriorities);
