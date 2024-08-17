import { intersection } from '@utilities/array';

interface Food {
  ingredients: string[];
  allergens: string[];
}

export const parseIngredients = (input: string) => {
  const [ingredientList, allergenList] = input.split(' (contains ');
  const ingredients = ingredientList.split(' ');
  const allergens = allergenList.slice(0, -1).split(', ');

  return {
    ingredients,
    allergens,
  };
};

export const getAllergenMap = (foods: Food[]) => {
  const allergenMap: Record<string, string[]> = {};

  for (const { ingredients, allergens } of foods) {
    for (const allergen of allergens) {
      const currentIngredients = allergenMap[allergen];
      allergenMap[allergen] = currentIngredients
        ? intersection(ingredients, currentIngredients)
        : ingredients;
    }
  }

  return allergenMap;
};
