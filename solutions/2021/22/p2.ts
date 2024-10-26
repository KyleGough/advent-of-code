import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { matchNumbers } from '@utilities/string';

export const day22p2 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);
  let cubes: Cube[] = [];

  for (const { toggle, cube } of instructions) {
    const nextCubes = [];

    for (const existingCube of cubes) {
      nextCubes.push(...existingCube.difference(cube));
    }

    cubes = nextCubes;

    if (toggle === 'ON') {
      cubes.push(cube);
    }
  }

  return cubes.map((cube) => cube.size()).reduce(sum, 0);
};

interface Instruction {
  toggle: 'ON' | 'OFF';
  cube: Cube;
}

const parseInstruction = (input: string): Instruction => {
  const [minX, maxX, minY, maxY, minZ, maxZ] = matchNumbers(input);

  return {
    toggle: input.startsWith('on') ? 'ON' : 'OFF',
    cube: new Cube([minX, maxX + 1, minY, maxY + 1, minZ, maxZ + 1]),
  };
};

class Cube {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;

  constructor(nums: number[]) {
    this.minX = nums[0];
    this.maxX = nums[1];
    this.minY = nums[2];
    this.maxY = nums[3];
    this.minZ = nums[4];
    this.maxZ = nums[5];
  }

  contains(other: Cube): boolean {
    return (
      this.minX <= other.minX &&
      this.maxX >= other.maxX &&
      this.minY <= other.minY &&
      this.maxY >= other.maxY &&
      this.minZ <= other.minZ &&
      this.maxZ >= other.maxZ
    );
  }

  intersects(other: Cube): boolean {
    return !(
      // TODO check if >= or > for all cases
      (
        this.minX >= other.maxX ||
        this.maxX <= other.minX ||
        this.minY >= other.maxY ||
        this.maxY <= other.minY ||
        this.minZ >= other.maxZ ||
        this.maxZ <= other.minZ
      )
    );
  }

  difference(other: Cube): Cube[] {
    if (!this.intersects(other)) {
      return [this];
    } else if (other.contains(this)) {
      return [];
    }

    const xSplit = [this.minX, this.maxX, other.minX, other.maxX].sort(
      (a, b) => a - b
    );
    const ySplit = [this.minY, this.maxY, other.minY, other.maxY].sort(
      (a, b) => a - b
    );
    const zSplit = [this.minZ, this.maxZ, other.minZ, other.maxZ].sort(
      (a, b) => a - b
    );

    const splitCubes: Cube[] = [];

    for (let x = 0; x < xSplit.length - 1; x++) {
      const xMin = xSplit[x];
      const xMax = xSplit[x + 1];
      for (let y = 0; y < ySplit.length - 1; y++) {
        const yMin = ySplit[y];
        const yMax = ySplit[y + 1];
        for (let z = 0; z < zSplit.length - 1; z++) {
          const zMin = zSplit[z];
          const zMax = zSplit[z + 1];
          splitCubes.push(new Cube([xMin, xMax, yMin, yMax, zMin, zMax]));
        }
      }
    }

    return splitCubes.filter(
      (cube) => this.contains(cube) && !other.intersects(cube)
    );
  }

  size(): number {
    return (
      (this.maxX - this.minX) *
      (this.maxY - this.minY) *
      (this.maxZ - this.minZ)
    );
  }
}

const input = getPuzzle(__dirname).input;
run(() => day22p2(input)); // 1263804707062415
