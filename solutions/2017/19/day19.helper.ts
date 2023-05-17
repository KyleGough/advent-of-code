enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export class TubeNetwork {
  grid: string[][];
  direction: Direction;
  y: number;
  x: number;
  reachedEnd: boolean;
  letterOrder: string[];
  steps: number;

  constructor(grid: string[][]) {
    this.grid = grid;
    this.direction = Direction.DOWN;
    [this.y, this.x] = [0, grid[0].indexOf('|')];
    this.reachedEnd = false;
    this.letterOrder = [];
    this.steps = 0;
  }

  traversePacket() {
    while (!this.reachedEnd) {
      this.move(this.direction);
      const nextValue = this.grid[this.y][this.x];

      switch (nextValue) {
        case ' ':
          this.reachedEnd = true;
          break;
        case '+':
          this.switchDirection();
          break;
        case '|':
        case '-':
          break;
        default:
          this.letterOrder.push(nextValue);
          break;
      }
    }
  }

  move(direction: Direction) {
    switch (direction) {
      case Direction.UP:
        this.y--;
        break;
      case Direction.DOWN:
        this.y++;
        break;
      case Direction.LEFT:
        this.x--;
        break;
      case Direction.RIGHT:
        this.x++;
        break;
    }

    this.steps++;
  }

  switchDirection() {
    if (this.isHorizontal()) {
      if (this.isMovableCell(this.y - 1, this.x)) {
        this.direction = Direction.UP;
      } else {
        this.direction = Direction.DOWN;
      }
    } else {
      if (this.isMovableCell(this.y, this.x - 1)) {
        this.direction = Direction.LEFT;
      } else {
        this.direction = Direction.RIGHT;
      }
    }
  }

  isMovableCell(y: number, x: number): boolean {
    return !!this.grid?.[y]?.[x] && this.grid?.[y]?.[x] !== ' ';
  }

  isHorizontal(): boolean {
    return (
      this.direction === Direction.LEFT || this.direction === Direction.RIGHT
    );
  }
}
