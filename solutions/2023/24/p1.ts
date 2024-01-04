import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customConfig } from './customConfig';

export const day24p1 = (input: string, bounds: Bounds) => {
  const hailstones = input.split('\n').map(parseLine);
  let count = 0;

  for (let i = 0; i < hailstones.length - 1; i++) {
    const hailA = hailstones[i];
    for (let j = i + 1; j < hailstones.length; j++) {
      const hailB = hailstones[j];

      // Parallel.
      if (hailA.isParallel(hailB)) {
        continue;
      }

      // Intersection.
      if (hailA.intersects(hailB, bounds)) {
        count++;
      }
    }
  }

  return count;
};

interface Vec2D {
  x: number;
  y: number;
}

interface Bounds {
  min: number;
  max: number;
}

class Hailstone {
  pos: Vec2D;
  vel: Vec2D;
  a: number;
  b: number;
  c: number;

  constructor(pos: Vec2D, vel: Vec2D) {
    this.pos = pos;
    this.vel = vel;
    this.a = vel.y;
    this.b = -vel.x;
    this.c = vel.y * pos.x - vel.x * pos.y;
  }

  isParallel(other: Hailstone): boolean {
    return this.a * other.b === this.b * other.a;
  }

  _inbounds(x: number, y: number, bounds: Bounds): boolean {
    return (
      x >= bounds.min && x <= bounds.max && y >= bounds.min && y <= bounds.max
    );
  }

  intersects(other: Hailstone, bounds: Bounds) {
    const num = this.c * other.b - other.c * this.b;
    const den = this.a * other.b - other.a * this.b;
    const x = num / den;

    const num1 = other.c * this.a - this.c * other.a;
    const y = num1 / den;

    const c1 = (x - this.pos.x) * this.vel.x >= 0;
    const c2 = (y - this.pos.y) * this.vel.y >= 0;
    const c3 = (x - other.pos.x) * other.vel.x >= 0;
    const c4 = (y - other.pos.y) * other.vel.y >= 0;
    const inFuture = c1 && c2 && c3 && c4;

    return inFuture && this._inbounds(x, y, bounds);
  }
}

const parseLine = (input: string): Hailstone => {
  const matches = [...input.matchAll(/-?\d+/g)];
  const values = matches.map((i) => parseInt(i[0]));
  const pos = { x: values[0], y: values[1] };
  const vel = { x: values[3], y: values[4] };
  return new Hailstone(pos, vel);
};

const input = getPuzzleWithConfig(__dirname, customConfig).input;
run(() => day24p1(...input)); // 15107
