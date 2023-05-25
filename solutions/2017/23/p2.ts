import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day23p2 = (input: string) => {
  const instructions = input.split('\n');
  let b = parseInt(instructions[0].split(' ')[2]);
  let h = 0;
  b = b * 100 + 100000;
  const c = b + 17000;

  for (let i = b; i <= c; i += 17) {
    for (let d = 2; d <= i; d++) {
      if (Number.isInteger(i / d) && i / d >= 2) {
        h++;
        break;
      }
    }
  }

  return h;
};

const input = getPuzzle(__dirname).input;
run(() => day23p2(input)); // 917
