import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { modulo } from '@utilities/modulo';

export const day01p1 = (input: string) => {
  const commands = input.split(', ');
  let direction = 0;
  let x = 0;
  let y = 0;

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];

    // Rotate user.
    if (command.charAt(0) === 'L') {
      direction = modulo(direction - 1, 4);
    } else {
      direction = modulo(direction + 1, 4);
    }

    const distance = parseInt(command.slice(1));

    if (direction === 0) {
      y += distance;
    } else if (direction === 1) {
      x += distance;
    } else if (direction === 2) {
      y -= distance;
    } else {
      x -= distance;
    }
  }

  return Math.abs(x) + Math.abs(y);
};

const input = getPuzzle(__dirname).example;
run(() => day01p1(input)); // 271
