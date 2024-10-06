import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInstruction } from './day02.helper';

export const day02p2 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);

  let depth = 0;
  let position = 0;
  let aim = 0;

  for (const [direction, value] of instructions) {
    switch (direction) {
      case 'up':
        aim -= value;
        break;
      case 'down':
        aim += value;
        break;
      case 'forward':
        position += value;
        depth += aim * value;
        break;
    }
  }

  return depth * position;
};

const input = getPuzzle(__dirname).input;
run(() => day02p2(input)); // 1685186100
