export const combinations = <T>(arr: T[], min: number, max: number) => {
  const combos: T[][] = max === arr.length ? [arr] : [];

  const comboRecursive = (
    n: number,
    excluded: T[],
    included: T[],
    combos: T[][]
  ) => {
    if (n === 0) {
      if (included.length > 0) {
        combos.push(included);
      }
      return;
    }

    for (let i = 0; i < excluded.length; i++) {
      comboRecursive(
        n - 1,
        excluded.slice(i + 1),
        included.concat([excluded[i]]),
        combos
      );
    }

    return;
  };

  for (let i = min; i < max; i++) {
    comboRecursive(i, arr, [], combos);
  }

  return combos;
};
