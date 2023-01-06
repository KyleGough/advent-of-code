import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { modulo } from '@utilities/modulo';

export const day01p2 = (input: string) => {
  const commands = input.split(', ');
  const visited = new Set(['0,0']);
  let direction = 0;
  let x = 0;
  let y = 0;
  let revisitedX = 0;
  let revisitedY = 0;
  let foundRevisited = false;

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];

    // Rotate user.
    if (command.charAt(0) === 'L') {
      direction = modulo(direction - 1, 4);
    } else {
      direction = modulo(direction + 1, 4);
    }

    const distance = parseInt(command.slice(1));

    for (let j = 0; j < distance; j++) {
      if (direction === 0) {
        y++;
      } else if (direction === 1) {
        x++;
      } else if (direction === 2) {
        y--;
      } else {
        x--;
      }

      const positionStr = `${x},${y}`;

      if (!foundRevisited && visited.has(positionStr)) {
        foundRevisited = true;
        revisitedX = x;
        revisitedY = y;
      }

      visited.add(positionStr);
    }
  }

  return Math.abs(revisitedX) + Math.abs(revisitedY);
};

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 153
