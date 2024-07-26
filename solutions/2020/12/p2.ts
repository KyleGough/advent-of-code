import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Coord, parseInstruction, traverse } from './day12.helper';

export const day12p2 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);

  const ship: Coord = { x: 0, y: 0 };
  let waypoint: Coord = { x: 10, y: -1 };
  let radians;

  for (const instruction of instructions) {
    const { heading, value } = instruction;

    switch (heading) {
      case 'N':
      case 'E':
      case 'S':
      case 'W':
        traverse(heading, value, waypoint);
        break;
      case 'L':
        radians = Math.PI * (value / 180);
        waypoint = rotateCoord(waypoint, radians);
        break;
      case 'R':
        radians = -Math.PI * (value / 180);
        waypoint = rotateCoord(waypoint, radians);
        break;
      case 'F':
        ship.x += waypoint.x * value;
        ship.y += waypoint.y * value;
        break;
    }
  }

  return Math.abs(ship.x) + Math.abs(ship.y);
};

const rotateCoord = (coord: Coord, radians: number): Coord => {
  return {
    x: Math.round(coord.x * Math.cos(radians) + coord.y * Math.sin(radians)),
    y: Math.round(-coord.x * Math.sin(radians) + coord.y * Math.cos(radians)),
  };
};

const input = getPuzzle(__dirname).input;
run(() => day12p2(input)); // 61053
