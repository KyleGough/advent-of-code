import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { stabiliseBricks, createBrickMap, Brick } from './day22.helper';

export const day22p1 = (input: string) => {
  const stabilisedBricks = stabiliseBricks(input);
  const brickMap = createBrickMap(stabilisedBricks);
  return countStableBricks(brickMap);
};

const countStableBricks = (brickMap: Record<number, Brick>): number => {
  let count = 0;

  for (const brick of Object.values(brickMap)) {
    let valid = true;

    for (const support of brick.supports) {
      const supportBrick = brickMap[support];
      if (supportBrick.supportedBy.length <= 1) {
        valid = false;
        break;
      }
    }

    if (valid) {
      count += 1;
    }
  }

  return count;
};

const input = getPuzzle(__dirname).input;
run(() => day22p1(input)); // 530
