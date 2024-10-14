import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseTarget, Target, triangleNumber } from './day17.helper';

export const day17p2 = (input: string) => {
  const target = parseTarget(input);

  const velocityMinY = target.minY;
  const velocityMaxY = Math.abs(target.minY);
  const velocityMaxX = target.maxX;
  let velocityMinX = 0;

  // Find the minimum horizontal velocity with the sum of natural numbers.
  while (triangleNumber(velocityMinX) < target.minX) {
    velocityMinX += 1;
  }

  let validTrajectoryCount = 0;

  for (let vy = velocityMinY; vy <= velocityMaxY; vy++) {
    for (let vx = velocityMinX; vx <= velocityMaxX; vx++) {
      if (isValidTrajectory(target, vx, vy)) {
        validTrajectoryCount += 1;
      }
    }
  }

  return validTrajectoryCount;
};

const isValidTrajectory = (target: Target, x: number, y: number): boolean => {
  let px = 0;
  let py = 0;
  let vx = x;
  let vy = y;
  let outOfBounds = false;

  while (!outOfBounds) {
    // Update positions.
    px += vx;
    py += vy;

    // Reduce horizontal velocity due to drag.
    if (vx) {
      vx += vx > 0 ? -1 : 1;
    }

    // Apply gravity.
    vy -= 1;

    // Check if the probe has entered the target.
    if (
      py >= target.minY &&
      py <= target.maxY &&
      px >= target.minX &&
      px <= target.maxX
    ) {
      return true;
    }

    // Check if probe has passed the target.
    if (vy < 0 && py < target.minY) {
      outOfBounds = true;
    }
  }

  return false;
};

const input = getPuzzle(__dirname).input;
run(() => day17p2(input)); // 2555
