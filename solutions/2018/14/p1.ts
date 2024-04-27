import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day14p1 = (input: string) => {
  const recipeCount = parseInt(input);
  const recipes = [3, 7];
  let elfA = 0;
  let elfB = 1;

  while (recipes.length < recipeCount + 10) {
    // Combine recipes.
    const combo = recipes[elfA] + recipes[elfB];
    const newRecipes = combo
      .toString()
      .split('')
      .map((d) => parseInt(d));

    // Add new recipes to the list.
    recipes.push(...newRecipes);

    // Pick new current recipe.
    elfA = (elfA + 1 + recipes[elfA]) % recipes.length;
    elfB = (elfB + 1 + recipes[elfB]) % recipes.length;
  }

  return recipes.slice(recipeCount, recipeCount + 10).join('');
};

const input = getPuzzle(__dirname).input;
run(() => day14p1(input)); // 7116398711
