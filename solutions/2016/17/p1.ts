import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import * as md5 from 'md5';
import { VaultState, isOpen } from './day17.helper';

export const day17p1 = (input: string) => {
  const queue: VaultState[] = [[input, 0, 0, 0]];
  let minSteps = Number.MAX_VALUE;
  let minPath = '';

  while (queue.length) {
    const [path, x, y, step] = queue.pop() as VaultState;

    // Prune states where the step count exceeds the current minimum successful path.
    if (step >= minSteps) {
      continue;
    }

    // Pass state check.
    if (x === 3 && y === 3) {
      minSteps = step;
      minPath = path;
      continue;
    }

    const hash = md5(path);

    // Next States.
    if (y > 0 && isOpen(hash[0])) {
      queue.push([path + 'U', x, y - 1, step + 1]);
    }
    if (y < 3 && isOpen(hash[1])) {
      queue.push([path + 'D', x, y + 1, step + 1]);
    }
    if (x > 0 && isOpen(hash[2])) {
      queue.push([path + 'L', x - 1, y, step + 1]);
    }
    if (x < 3 && isOpen(hash[3])) {
      queue.push([path + 'R', x + 1, y, step + 1]);
    }
  }

  return minPath.slice(input.length);
};

const input = getPuzzle(__dirname).input;
run(() => day17p1(input)); // DDRRUDLRRD
