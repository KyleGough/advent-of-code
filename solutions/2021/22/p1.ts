import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { matchNumbers } from '@utilities/string';

export const day22p1 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);
  const size = 101;

  const arr = () => Array(size).fill(false);
  const grid = arr().map(() => arr().map(() => arr().fill(false)));

  for (const { toggle, cube } of instructions) {
    const [minX, maxX, minY, maxY, minZ, maxZ] = cube;

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          grid[x + 50][y + 50][z + 50] = toggle === 'ON';
        }
      }
    }
  }

  let count = 0;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        if (grid[x][y][z]) {
          count += 1;
        }
      }
    }
  }

  return count;
};

interface Instruction {
  toggle: 'ON' | 'OFF';
  cube: number[];
}

const parseInstruction = (input: string): Instruction => {
  const nums = matchNumbers(input);
  const minX = Math.max(nums[0], -50);
  const maxX = Math.min(nums[1], 50);
  const minY = Math.max(nums[2], -50);
  const maxY = Math.min(nums[3], 50);
  const minZ = Math.max(nums[4], -50);
  const maxZ = Math.min(nums[5], 50);

  return {
    toggle: input.startsWith('on') ? 'ON' : 'OFF',
    cube: [minX, maxX, minY, maxY, minZ, maxZ],
  };
};

const input = getPuzzle(__dirname).input;
run(() => day22p1(input)); // 582644
