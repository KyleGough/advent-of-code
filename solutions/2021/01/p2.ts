import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day01p2 = (input: string) => {
  const depths = input.split('\n').map(Number);
  let increaseCount = 0;
  let previousWindowSize = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < depths.length - 2; i++) {
    const window = depths.slice(i, i + 3);
    const windowSize = window.reduce(sum, 0);

    if (windowSize > previousWindowSize) {
      increaseCount += 1;
    }

    previousWindowSize = windowSize;
  }

  return increaseCount;
};

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 1761
