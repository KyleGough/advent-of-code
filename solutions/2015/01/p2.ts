import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day01p2 = (input: string) => {
  let floor = 0;
  for (let i = 0; i < input.length; i++) {
    floor = input.charAt(i) === '(' ? floor + 1 : floor - 1;
    if (floor === -1) {
      return i + 1;
    }
  }
};

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 1783
