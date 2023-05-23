const EXPAND_STEP = 10;

class Vec {
  x: number;
  y: number;
  direction: number;

  constructor(x: number, y: number, direction: number) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
}

export class InfiniteGrid<T> {
  grid: T[][];
  infectionCount: number;
  virus: Vec;
  infectedState: T;
  fillState: T;

  constructor(
    input: string,
    stateMapper: (s: string) => T,
    infectedState: T,
    fillState: T
  ) {
    this.grid = this.parseGrid(input, stateMapper);
    this.infectionCount = 0;
    this.virus = new Vec(...this.getCentre(), 0);
    this.infectedState = infectedState;
    this.fillState = fillState;
  }

  parseGrid(input: string, stateMapper: (s: string) => T): T[][] {
    return input.split('\n').map((row) => row.split('').map(stateMapper));
  }

  getCentre(): [number, number] {
    return [
      Math.floor(this.grid[0].length / 2),
      Math.floor(this.grid.length / 2),
    ];
  }

  get(): T {
    return this.grid[this.virus.y][this.virus.x];
  }

  set(value: T) {
    if (value === this.infectedState) {
      this.infectionCount++;
    }

    this.grid[this.virus.y][this.virus.x] = value;
  }

  moveUp() {
    this.virus.y--;
    if (this.virus.y < 0) {
      for (let i = 0; i < EXPAND_STEP; i++) {
        this.grid.unshift(Array(this.grid[0].length).fill(this.fillState));
      }
      this.virus.y += EXPAND_STEP;
    }
  }

  moveRight() {
    this.virus.x++;
    if (this.virus.x >= this.grid[0].length) {
      this.grid = this.grid.map((row) =>
        row.concat(Array(EXPAND_STEP).fill(this.fillState))
      );
    }
  }

  moveDown() {
    this.virus.y++;
    if (this.virus.y >= this.grid.length) {
      for (let i = 0; i < EXPAND_STEP; i++) {
        this.grid.push(Array(this.grid[0].length).fill(this.fillState));
      }
    }
  }

  moveLeft() {
    this.virus.x--;
    if (this.virus.x < 0) {
      this.grid = this.grid.map((row) =>
        Array(EXPAND_STEP).fill(this.fillState).concat(row)
      );
      this.virus.x += EXPAND_STEP;
    }
  }

  move() {
    switch (this.virus.direction) {
      case 0: // Up
        this.moveUp();
        break;
      case 1: // Right
        this.moveRight();
        break;
      case 2: // Down
        this.moveDown();
        break;
      case 3: // Left
        this.moveLeft();
        break;
    }
  }
}
