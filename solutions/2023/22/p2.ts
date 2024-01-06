import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Brick, createBrickMap, stabiliseBricks } from './day22.helper';
import { sum } from '@utilities/reduce';

export const day22p2 = (input: string) => {
  const stabilisedBricks = stabiliseBricks(input);
  const brickMap = createBrickMap(stabilisedBricks);

  return stabilisedBricks
    .map((brick) => supportCount(brick, brickMap))
    .reduce(sum, 0);
};

const supportCount = (
  startBrick: Brick,
  brickMap: Record<number, Brick>
): number => {
  const queue = [startBrick.id];
  const seen = new Set<number>([startBrick.id]);

  while (queue.length) {
    const brick = brickMap[queue.pop() as number];

    for (const support of brick.supports) {
      const supportBrick = brickMap[support];
      const supportedBy = supportBrick.supportedBy.filter((i) => !seen.has(i));

      if (supportedBy.length === 0) {
        seen.add(support);
        queue.push(support);
      }
    }
  }

  return seen.size - 1;
};

const input = getPuzzle(__dirname).input;
run(() => day22p2(input)); // 93292
