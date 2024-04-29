import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day14p2 = (input: string) => {
  const recipes = [3, 7];
  let elfA = 0;
  let elfB = 1;

  while (true) {
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

    let endIndex = (newRecipes.length === 2 ? -1 : 0) - input.length;
    const endRecipes = recipes.slice(endIndex).join('');
    if (endRecipes.slice(1).includes(input)) {
      endIndex += 1;
    }

    if (endRecipes.includes(input)) {
      return recipes.length + endIndex;
    }
  }
};

const input = getPuzzle(__dirname).input;
run(() => day14p2(input)); // 20316365
