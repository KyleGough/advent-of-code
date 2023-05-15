import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { modulo } from '@utilities/modulo';

const spinlockAfterZero = (n: number, step: number): number => {
  let insertIndex = 0;
  let listLength = 1;
  let afterZero = 0;

  for (let i = 1; i <= n; i++) {
    insertIndex = modulo(insertIndex + step, listLength);

    if (insertIndex + 1 === listLength) {
      listLength++;
      insertIndex = listLength - 1;
    } else {
      if (insertIndex === 0) {
        afterZero = i;
      }
      insertIndex++;
      listLength++;
    }
  }

  return afterZero;
};

export const day17p2 = (input: string) => {
  const step = parseInt(input);
  return spinlockAfterZero(50_000_000, step);
};

const input = getPuzzle(__dirname).input;
run(() => day17p2(input)); // 11995607
