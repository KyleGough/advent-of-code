import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getAllergenMap, parseIngredients } from './day21.helper';

export const day21p2 = (input: string) => {
  const foods = input.split('\n').map(parseIngredients);
  const allergenMap: Record<string, string[]> = getAllergenMap(foods);
  const finalMap: Record<string, string> = {};

  while (Object.keys(allergenMap).length) {
    let ingredient: string;

    for (const key of Object.keys(allergenMap)) {
      if (allergenMap[key].length === 1) {
        ingredient = allergenMap[key].pop() as string;
        finalMap[key] = ingredient;
        delete allergenMap[key];
        break;
      }
    }

    for (const key of Object.keys(allergenMap)) {
      allergenMap[key] = allergenMap[key].filter((i) => i !== ingredient);
    }
  }

  return Object.keys(finalMap)
    .sort()
    .map((key) => finalMap[key])
    .join(',');
};

const input = getPuzzle(__dirname).input;
run(() => day21p2(input)); // bxjvzk,hqgqj,sp,spl,hsksz,qzzzf,fmpgn,tpnnkc
