import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  parseIngredient,
  generateIngredientAmounts,
  cookieScore,
} from './day15.helper';

export const day15p1 = (input: string) => {
  const ingredients = input.split('\n').map(parseIngredient);
  const ingredientCount = ingredients.length;
  const ingredientAmounts = generateIngredientAmounts(ingredientCount);
  const scores = ingredientAmounts.map((i) => cookieScore(i, ingredients));
  return scores.reduce((prev, curr) => Math.max(prev, curr), 0);
};

const input = getPuzzle(__dirname).input;
run(() => day15p1(input)); // 18965440
