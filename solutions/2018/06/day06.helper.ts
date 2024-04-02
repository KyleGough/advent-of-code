export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getManhattanDistance(x: number, y: number) {
    return Math.abs(x - this.x) + Math.abs(y - this.y);
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}

export const parsePoint = (input: string): Point => {
  const [x, y] = input.split(', ');
  return new Point(parseInt(x), parseInt(y));
};

export const getBoundingBox = (points: Point[]) => {
  const minX = points.reduce(
    (prev, curr) => Math.min(prev, curr.x),
    Number.MAX_SAFE_INTEGER
  );

  const maxX = points.reduce((prev, curr) => Math.max(prev, curr.x), 0);

  const minY = points.reduce(
    (prev, curr) => Math.min(prev, curr.y),
    Number.MAX_SAFE_INTEGER
  );

  const maxY = points.reduce((prev, curr) => Math.max(prev, curr.y), 0);

  return {
    minX,
    maxX,
    minY,
    maxY,
  };
};
