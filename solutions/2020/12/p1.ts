import { getPuzzle } from '@utilities/getPuzzle';
import { modulo } from '@utilities/modulo';
import { run } from '@utilities/run';
import { Coord, parseInstruction, traverse } from './day12.helper';

export const day12p1 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);

  let shipHeading = 1; // East;
  const ship: Coord = { x: 0, y: 0 };

  for (const instruction of instructions) {
    const { heading, value } = instruction;

    switch (heading) {
      case 'N':
      case 'E':
      case 'S':
      case 'W':
        traverse(heading, value, ship);
        break;
      case 'L':
        shipHeading -= value / 90;
        shipHeading = modulo(shipHeading, 4);
        break;
      case 'R':
        shipHeading += value / 90;
        shipHeading = modulo(shipHeading, 4);
        break;
      case 'F':
        traverse(['N', 'E', 'S', 'W'][shipHeading], value, ship);
        break;
    }
  }

  return Math.abs(ship.x) + Math.abs(ship.y);
};

const input = getPuzzle(__dirname).input;
run(() => day12p1(input)); // 1133
