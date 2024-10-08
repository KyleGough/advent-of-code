import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day05p2 = (input: string) => {
  const lines = input.split('\n').map(parseLine);
  const overlaps = new Set<string>();

  for (let i = 0; i < lines.length - 1; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const overlap = lines[i].getOverlap(lines[j]);
      for (const point of overlap) {
        overlaps.add(point);
      }
    }
  }

  return overlaps.size;
};

class Line {
  line: number[];
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  type: 'H' | 'V' | 'D';
  points: Set<string>;

  constructor(nums: number[]) {
    this.line = nums;
    if (nums[1] === nums[3]) {
      this.points = getHorizontalPoints(nums);
      this.type = 'H';
    } else if (nums[0] === nums[2]) {
      this.points = getVerticalPoints(nums);
      this.type = 'V';
    } else {
      this.points = getDiagonalPoints(nums);
      this.type = 'D';
    }

    this.minX = Math.min(nums[0], nums[2]);
    this.maxX = Math.max(nums[0], nums[2]);
    this.minY = Math.min(nums[1], nums[3]);
    this.maxY = Math.max(nums[1], nums[3]);
  }

  getOverlapSimple(other: Line): string[] {
    const overlaps: string[] = [];
    const minmaxX = Math.max(this.minX, other.minX);
    const maxminX = Math.min(this.maxX, other.maxX);
    const minmaxY = Math.max(this.minY, other.minY);
    const maxminY = Math.min(this.maxY, other.maxY);

    if (minmaxX <= maxminX && minmaxY <= maxminY) {
      for (let x = minmaxX; x <= maxminX; x++) {
        for (let y = minmaxY; y <= maxminY; y++) {
          overlaps.push(`${x},${y}`);
        }
      }
    }

    return overlaps;
  }

  getOverlap(other: Line): string[] {
    if (this.type !== 'D' && other.type !== 'D') {
      return this.getOverlapSimple(other);
    }

    const arr = [...this.points];
    return arr.filter((point) => other.points.has(point));
  }
}

const parseLine = (input: string): Line => {
  const nums = input
    .split(' -> ')
    .map((i) => i.split(','))
    .flat()
    .map(Number);
  return new Line(nums);
};

const getHorizontalPoints = (line: number[]): Set<string> => {
  const points = new Set<string>();
  const minX = Math.min(line[0], line[2]);
  const maxX = Math.max(line[0], line[2]);
  for (let x = minX; x <= maxX; x++) {
    points.add(`${x},${line[1]}`);
  }
  return points;
};

const getVerticalPoints = (line: number[]): Set<string> => {
  const points = new Set<string>();
  const minY = Math.min(line[1], line[3]);
  const maxY = Math.max(line[1], line[3]);
  for (let y = minY; y <= maxY; y++) {
    points.add(`${line[0]},${y}`);
  }
  return points;
};

const getDiagonalPoints = (line: number[]): Set<string> => {
  const points = new Set<string>();

  let steps = Math.abs(line[0] - line[2]);
  const xStep = line[0] < line[2] ? 1 : -1;
  const yStep = line[1] < line[3] ? 1 : -1;

  let x = line[0];
  let y = line[1];

  while (steps) {
    points.add(`${x},${y}`);
    x += xStep;
    y += yStep;
    steps -= 1;
  }

  points.add(`${x},${y}`);

  return points;
};

const input = getPuzzle(__dirname).input;
run(() => day05p2(input)); // 22213
