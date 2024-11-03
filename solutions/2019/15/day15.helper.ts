import { Intcode } from '../05/day05.helper';
import { Stack } from '@utilities/stack';

export type Coord = `${number},${number}`;
export type Position = { x: number; y: number };
type Junction = Record<Coord, number>;

type Maze = {
  stack: Stack<Coord>;
  grid: Record<Coord, string>;
  pos: Position;
};

export const exploreMaze = (nums: number[]): Maze => {
  const grid: Record<Coord, string> = { '0,0': '.' };
  const junctions: Record<Coord, Junction> = {};
  let pos = { x: 0, y: 0 };
  let previousPos = pos;
  let direction = 0;
  const stack = new Stack<Coord>();
  const program = new Intcode(nums);
  let output = 0;

  // let step = { ip: 0, base: 0, halt: false, output: 0 };

  while (output !== 2) {
    // Scan local area.
    const posHash: Coord = `${pos.x},${pos.y}`;
    const area = scanArea(program.program, pos, grid);
    const junction = isJunction(area);

    // Mark previous as visited.
    if (junction) {
      const previousHash: Coord = `${previousPos.x},${previousPos.y}`;
      junctions[posHash] = junctions[posHash] ?? {};
      junctions[posHash][previousHash] =
        (junctions[posHash][previousHash] ?? 0) + 1;
    }

    previousPos = pos;
    direction = getDirection(area, direction, junctions, pos, stack);

    output = program.awaitOutput([direction]);
    pos = moveDroid(pos, direction);
  }

  return { stack, grid, pos };
};

const outputMap: Record<number, string> = {
  0: '#',
  1: '.',
  2: '.',
};

export const directions: Position[] = [
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
];

// Scans the four adjacent tiles around the droid.
const scanArea = (
  nums: number[],
  pos: Position,
  grid: Record<Coord, string>
): string[] => {
  const area = [];

  for (let d = 0; d < directions.length; d++) {
    const direction = directions[d];
    const output = new Intcode([...nums]).awaitOutput([d + 1]);
    const x = pos.x + direction.x;
    const y = pos.y + direction.y;
    grid[`${x},${y}`] = outputMap[output];
    area.push(outputMap[output]);
  }

  return area;
};

const isJunction = (area: string[]): boolean => {
  return area.filter((a) => a === '.').length > 2;
};

const getDirection = (
  area: string[],
  previousDirection: number,
  junctions: Record<Coord, Junction>,
  pos: Position,
  stack: Stack<Coord>
): number => {
  const paths = area.filter((a) => a === '.').length;
  const posHash: Coord = `${pos.x},${pos.y}`;

  // Find the direction needed to go to the previous tile.
  const flipDirection: Record<number, number> = {
    1: 2,
    2: 1,
    3: 4,
    4: 3,
  };

  switch (paths) {
    case 1:
      // Dead-end, turn back.
      return area.indexOf('.') + 1;
    case 2:
      // Corridor, carry on in same direction.
      if (stack.peek() === posHash) {
        stack.pop();
      } else {
        stack.push(posHash);
      }

      return (
        area.findIndex(
          (value, index) =>
            value === '.' && index !== flipDirection[previousDirection] - 1
        ) + 1
      );
    case 3:
    case 4:
      if (stack.peek() !== posHash) {
        stack.push(posHash);
      }
      // Tremaux's algorithm.

      // Directions which are open paths and not leading to the previous tile.
      const openIndexes = [1, 2, 3, 4].filter(
        (_, i) => area[i] === '.' && i !== flipDirection[previousDirection] - 1
      );

      // Coords of the candidate paths.
      const openDirections = openIndexes
        .map((d) => directions[d - 1])
        .map(({ x, y }) => `${pos.x + x},${pos.y + y}` as Coord);

      // Junction visit values for use in Tremaux's algorithm.
      const openJunctions = openDirections.map(
        (d) => junctions[posHash][d] ?? 0
      );

      for (let i = 0; i < openJunctions.length; i++) {
        if (openJunctions[i] === 0) {
          const visitCount = junctions[posHash][openDirections[i]];
          // Increment visit count for path.
          junctions[posHash][openDirections[i]] = (visitCount ?? 0) + 1;
          // Return direction of path not yet visited.
          return openIndexes[i];
        }
      }

      for (let i = 0; i < openJunctions.length; i++) {
        if (openJunctions[i] === 1) {
          const visitCount = junctions[posHash][openDirections[i]];
          // Increment visit count for path.
          junctions[posHash][openDirections[i]] = (visitCount ?? 0) + 1;
          // Remove junction from stack if this is final visit.
          if (junctions[posHash][openDirections[i]] === 2) {
            stack.pop();
          }
          // Return direction of path visited once before.
          return openIndexes[i];
        }
      }

      // Unable to choose intersection direction,
      // therefore, reached each of maze searching.
      return 0;
    default:
      throw new Error('Illegal state');
  }
};

const moveDroid = (pos: Position, direction: number): Position => {
  const { x, y } = directions[direction - 1];
  return { x: pos.x + x, y: pos.y + y };
};
