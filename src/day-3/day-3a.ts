import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputData = readFileSync(resolve(__dirname, 'input'), 'utf-8');
const rucksacks = inputData.split('\n');

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

const sumPriorities = priorities.reduce((prev, curr) => prev + curr, 0);

console.log(sumPriorities);
