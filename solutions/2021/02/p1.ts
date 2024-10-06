import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInstruction } from './day02.helper';

export const day02p1 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);

  let depth = 0;
  let position = 0;

  for (const [direction, value] of instructions) {
    switch (direction) {
      case 'up':
        depth -= value;
        break;
      case 'down':
        depth += value;
        break;
      case 'forward':
        position += value;
        break;
    }
  }

  return depth * position;
};

const input = getPuzzle(__dirname).input;
run(() => day02p1(input)); // 1604850
