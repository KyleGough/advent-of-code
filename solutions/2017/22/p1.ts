import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { modulo } from '@utilities/modulo';
import { InfiniteGrid } from './day22.helper';

export const day22p1 = (input: string) => {
  const grid = new InfiniteGrid(input, (i) => i === '#', true, false);

  for (let i = 0; i < 10000; i++) {
    grid.virus.direction += grid.get() ? 1 : -1;
    grid.virus.direction = modulo(grid.virus.direction, 4);
    grid.set(!grid.get());
    grid.move();
  }

  return grid.infectionCount;
};

const input = getPuzzle(__dirname).input;
run(() => day22p1(input)); // 5259
