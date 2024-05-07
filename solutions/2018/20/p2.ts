import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day20p2 = (input: string) => {
  const stack: Point[] = [];
  let current = new Point(0, 0);
  const grid: Record<string, number> = { [current.toString()]: 0 };

  for (const char of input.split('')) {
    switch (char) {
      case 'N':
      case 'E':
      case 'S':
      case 'W':
        const distance = grid[current.toString()] + 1;
        current = current.next(char);
        const index = current.toString();
        grid[index] = Math.min(distance, grid[index] ?? Number.MAX_VALUE);
        break;
      case '(':
        stack.push(current);
        break;
      case ')':
        current = stack.pop() as Point;
        break;
      case '|':
        current = stack[stack.length - 1];
        break;
    }
  }

  return Object.values(grid).filter((i) => i >= 1000).length;
};

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  next(direction: string): Point {
    if (direction === 'N') {
      return new Point(this.x, this.y - 1);
    } else if (direction === 'E') {
      return new Point(this.x + 1, this.y);
    } else if (direction === 'S') {
      return new Point(this.x, this.y + 1);
    } else {
      return new Point(this.x - 1, this.y);
    }
  }

  toString(): string {
    return `${this.x},${this.y}`;
  }
}

const input = getPuzzle(__dirname).input;
run(() => day20p2(input)); // 8492
