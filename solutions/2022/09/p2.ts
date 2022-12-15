import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

class Cell {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return this.x.toString() + ', ' + this.y.toString();
  }
}

const moveHead = (head: Cell, direction: string) => {
  switch (direction) {
    case 'U':
      return new Cell(head.x, head.y + 1);
    case 'D':
      return new Cell(head.x, head.y - 1);
    case 'L':
      return new Cell(head.x - 1, head.y);
    default:
      return new Cell(head.x + 1, head.y);
  }
};

const updateTail = (tail: Cell, head: Cell) => {
  const xGap = Math.abs(head.x - tail.x);
  const yGap = Math.abs(head.y - tail.y);

  if (xGap === 2 && yGap === 0) {
    // Head and Tail differ by 2 positions in one direction.
    return new Cell((head.x + tail.x) / 2, tail.y);
  } else if (xGap === 0 && yGap === 2) {
    // Head and Tail differ by 2 positions in one direction.
    return new Cell(tail.x, (head.y + tail.y) / 2);
  } else if (xGap === 2 && yGap === 1) {
    // Head and Tail do not touch.
    return new Cell((head.x + tail.x) / 2, head.y);
  } else if (xGap === 1 && yGap === 2) {
    // Head and Tail do not touch.
    return new Cell(head.x, (head.y + tail.y) / 2);
  } else if (xGap === 2 && yGap === 2) {
    // Head and Tail are diagonal by 2 positions.
    return new Cell((head.x + tail.x) / 2, (head.y + tail.y) / 2);
  } else {
    return tail;
  }
};

export const day09p2 = (input: string) => {
  const instructions = input.split('\n');
  const visitedCells = new Set();

  const knots = [];

  for (let i = 0; i < 10; i++) {
    knots.push(new Cell(0, 0));
  }

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i].split(' ');
    const direction = instruction[0];
    const distance = parseInt(instruction[1]);

    for (let j = 0; j < distance; j++) {
      knots[0] = moveHead(knots[0], direction);
      for (let k = 1; k < 10; k++) {
        knots[k] = updateTail(knots[k], knots[k - 1]);
      }
      visitedCells.add(knots[9].toString());
    }
  }

  return visitedCells.size;
};

const input = getPuzzle(__dirname).input;
run(() => day09p2(input)); // 2541
