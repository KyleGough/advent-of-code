import { getPuzzle } from '@utilities/getPuzzle';
import { max } from '@utilities/reduce';
import { run } from '@utilities/run';
import {
  parseIngredient,
  generateIngredientAmounts,
  cookieScore,
} from './day15.helper';

const calorieCount = (amounts: number[], ingredients: number[][]): number => {
  let calorieCount = 0;

  for (let i = 0; i < amounts.length; i++) {
    calorieCount += amounts[i] * ingredients[i][4];
  }

  return calorieCount;
};

export const day15p2 = (input: string) => {
  const ingredients = input.split('\n').map(parseIngredient);
  const ingredientCount = ingredients.length;
  const ingredientAmounts = generateIngredientAmounts(ingredientCount);
  const validAmounts = ingredientAmounts.filter(
    (amount) => calorieCount(amount, ingredients) === 500
  );

  const scores = validAmounts.map((i) => cookieScore(i, ingredients));
  return scores.reduce(max);
};

const input = getPuzzle(__dirname).input;
run(() => day15p2(input)); // 15862900
