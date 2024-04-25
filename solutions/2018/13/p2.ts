import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getCarts, moveCart, checkImpact } from './day13.helper';

export const day13p2 = (input: string) => {
  const grid = input.split('\n').map((r) => r.split(''));
  let carts = getCarts(grid);

  while (carts.length > 1) {
    for (let i = 0; i < carts.length; i++) {
      carts[i] = moveCart(carts[i], grid);
      checkImpact(carts[i], carts);
    }
    carts = carts.filter((c) => !c.impact);
    carts.sort();
  }

  return `${carts[0].x},${carts[0].y}`;
};

const input = getPuzzle(__dirname).input;
run(() => day13p2(input)); // TODO
