export class Brick {
  pos: number[];
  id: number;
  supports: number[];
  supportedBy: number[];

  constructor(pos: number[], id: number) {
    this.pos = pos;
    this.id = id;
    this.supports = [];
    this.supportedBy = [];
  }

  overlaps(other: Brick): boolean {
    return (
      this.pos[0] <= other.pos[3] &&
      this.pos[3] >= other.pos[0] &&
      this.pos[1] <= other.pos[4] &&
      this.pos[4] >= other.pos[1]
    );
  }

  getHeight(): number {
    return this.pos[5] - this.pos[2];
  }

  fallToHeight(z: number) {
    const height = this.getHeight();
    this.pos[2] = z;
    this.pos[5] = z + height;
  }

  static sortLowHeight(brickA: Brick, brickB: Brick): number {
    return brickB.pos[2] - brickA.pos[2];
  }

  static sortHighHeight(brickA: Brick, brickB: Brick): number {
    return brickB.pos[5] - brickA.pos[5];
  }
}

const parseBrick = (input: string, idx: number): Brick => {
  return new Brick(input.replace('~', ',').split(',').map(Number), idx);
};

const getFloatingBricks = (input: string): Brick[] => {
  return input
    .split('\n')
    .map((b, idx) => parseBrick(b, idx))
    .sort(Brick.sortLowHeight);
};

export const stabiliseBricks = (input: string) => {
  const bricks = getFloatingBricks(input);
  const stabilisedBricks: Brick[] = [];

  while (bricks.length) {
    const brick = bricks.pop() as Brick;

    let stabilisedZ = 1;
    let highestZOverlap = 0;

    for (const b of stabilisedBricks) {
      // Skip checking overlaps once top-height is less than first overlap height.
      if (highestZOverlap && highestZOverlap !== b.pos[5]) {
        continue;
      }

      if (brick.overlaps(b)) {
        stabilisedZ = b.pos[5] + 1;
        highestZOverlap = b.pos[5];
        b.supports.push(brick.id);
        brick.supportedBy.push(b.id);
      }
    }

    // Move brick down to new stabilised height.
    brick.fallToHeight(stabilisedZ);
    stabilisedBricks.unshift(brick);
    stabilisedBricks.sort(Brick.sortHighHeight);
  }

  return stabilisedBricks;
};

export const createBrickMap = (bricks: Brick[]): Record<number, Brick> => {
  return bricks.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.id]: curr,
    };
  }, {});
};
