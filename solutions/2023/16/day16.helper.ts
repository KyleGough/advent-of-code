export class Vec {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vec: Vec): Vec {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }

  inBounds(width: number, height: number): boolean {
    return this.x >= 0 && this.x < width && this.y >= 0 && this.y < height;
  }

  transpose(): Vec {
    return new Vec(this.y, this.x);
  }

  negate(): Vec {
    return new Vec(-this.x, -this.y);
  }

  toString(): string {
    return `${this.x},${this.y}`;
  }
}

export const traceBeam = (
  position: Vec,
  velocity: Vec,
  grid: string[][],
  history = new Set<string>()
): string[] => {
  const height = grid.length;
  const width = grid[0].length;
  const excitedCells = [position.toString()];

  let pos: Vec = position;
  let vel: Vec = velocity;

  while (true) {
    pos = pos.add(vel);

    if (!pos.inBounds(width, height)) {
      return excitedCells;
    }

    excitedCells.push(pos.toString());

    const cellType = grid[pos.y][pos.x];

    switch (cellType) {
      case '.':
        // Pass through.
        break;
      case '/':
        vel = vel.transpose().negate();
        break;
      case '\\':
        vel = vel.transpose();
        break;
      case '-':
        if (vel.y !== 0) {
          if (!history.has(pos.toString())) {
            // Split beam.
            history.add(pos.toString());
            const splitLeft = traceBeam(pos, new Vec(-1, 0), grid, history);
            const splitRight = traceBeam(pos, new Vec(1, 0), grid, history);
            return [...excitedCells, ...splitLeft, ...splitRight];
          } else {
            return excitedCells;
          }
        }
        break;
      case '|':
        if (vel.x !== 0) {
          if (!history.has(pos.toString())) {
            // Split beam.
            history.add(pos.toString());
            const splitUp = traceBeam(pos, new Vec(0, -1), grid, history);
            const splitDown = traceBeam(pos, new Vec(0, 1), grid, history);
            return [...excitedCells, ...splitUp, ...splitDown];
          } else {
            return excitedCells;
          }
        }
        break;
    }
  }
};

export const countTiles = (tiles: string[]): number => {
  return new Set(tiles).size - 1;
};
