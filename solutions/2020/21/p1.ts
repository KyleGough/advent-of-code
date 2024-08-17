import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getAllergenMap, parseIngredients } from './day21.helper';

export const day21p1 = (input: string) => {
  const foods = input.split('\n').map(parseIngredients);
  const counts: Record<string, number> = {};

  for (const { ingredients } of foods) {
    for (const ingredient of ingredients) {
      counts[ingredient] = counts[ingredient] + 1 || 1;
    }
  }

  const allergenMap = getAllergenMap(foods);
  const allergenIngredients = Object.values(allergenMap).flat();
  const allergenFreeIngredients = Object.keys(counts).filter(
    (ingredient) => !allergenIngredients.includes(ingredient)
  );

  return allergenFreeIngredients.reduce((prev, curr) => prev + counts[curr], 0);
};

const input = getPuzzle(__dirname).input;
run(() => day21p1(input)); // 2324
