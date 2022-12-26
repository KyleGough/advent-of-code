export class Cell {
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

export const moveHead = (head: Cell, direction: string) => {
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
