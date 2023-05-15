import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { modulo } from '@utilities/modulo';

const spinlock = (n: number, step: number): number[] => {
  let list = [0];
  let insertIndex = 0;

  for (let i = 1; i <= n; i++) {
    insertIndex = modulo(insertIndex + step, list.length);

    if (insertIndex + 1 === list.length) {
      list = [...list, i];
      insertIndex = list.length - 1;
    } else {
      insertIndex++;
      list = [...list.slice(0, insertIndex), i, ...list.slice(insertIndex)];
    }
  }

  return list;
};

export const day17p1 = (input: string) => {
  const step = parseInt(input);
  const list = spinlock(2017, step);

  for (let i = 0; i < list.length; i++) {
    if (list[i] === 2017) {
      return list[i + 1];
    }
  }
};

const input = getPuzzle(__dirname).input;
run(() => day17p1(input)); // 886
