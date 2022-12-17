export const parseIngredient = (input: string): number[] => {
  const matches = input.match(
    /.+ (?<cap>-?\d+),.+ (?<dur>-?\d+),.+ (?<fla>-?\d+),.+ (?<tex>-?\d+), .+ (?<cal>-?\d+)/
  )?.groups;

  if (!matches) throw new Error('Unable to parse ingredient');

  return Object.values(matches).map((i) => parseInt(i));
};

export const generateIngredientAmounts = (
  ingredientCount: number,
  prevTotal = 0
): number[][] => {
  let output: number[][] = [];

  if (ingredientCount === 1) {
    return [[100 - prevTotal]];
  }

  for (let i = 0; i < 100 - prevTotal; i++) {
    const nextIngredientAmounts = generateIngredientAmounts(
      ingredientCount - 1,
      prevTotal + i
    ).map((arr) => {
      arr.push(i);
      return arr;
    });
    output = [...output, ...nextIngredientAmounts];
  }

  return output;
};

export const cookieScore = (amounts: number[], ingredients: number[][]) => {
  const absoluteAmounts = ingredients.map((ingredient, i) =>
    ingredient.map((k) => k * amounts[i])
  );

  let score = 1;

  for (let i = 0; i < 4; i++) {
    score *= Math.max(
      0,
      absoluteAmounts
        .map((amount) => amount[i])
        .reduce((prev, curr) => prev + curr, 0)
    );
  }

  return score;
};
