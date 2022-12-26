import { product, sum } from '@utilities/reduce';
import { combinations } from '@utilities/combinations';

export const getMinimumQE = (weights: number[], binCount: number): number => {
  const binSize = weights.reduce(sum) / binCount;
  const combos = combinations(weights, 2, Math.floor(weights.length / 3));
  const validCombos = combos.filter((i) => i.reduce(sum) === binSize);
  let minComboQE = Number.MAX_VALUE;

  for (let i = 0; i < validCombos.length; i++) {
    const comboQE = validCombos[i].reduce(product);
    if (comboQE < minComboQE) {
      minComboQE = comboQE;
    }
  }

  return minComboQE;
};
