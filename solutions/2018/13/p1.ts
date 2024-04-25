import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getCarts, moveCart, checkImpact, Impact } from './day13.helper';

export const day13p1 = (input: string) => {
  const grid = input.split('\n').map((r) => r.split(''));
  const carts = getCarts(grid);
  let impact: Impact = { hasImpact: false };

  while (!impact.hasImpact) {
    for (let i = 0; i < carts.length; i++) {
      carts[i] = moveCart(carts[i], grid);
      impact = checkImpact(carts[i], carts);
      if (carts[i].impact) {
        break;
      }
    }
    carts.sort();
  }

  return `${impact.cart?.x},${impact.cart?.y}`;
};

const input = getPuzzle(__dirname).input;
run(() => day13p1(input)); // 86,118
