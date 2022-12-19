import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { adjacentChecks, Droplet, parseDroplet } from './day18.helper';
import { min, max } from '@utilities/reduce';

interface BoundingBox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
}

// Find bounding box of droplets.
const getBoundingBox = (droplets: Droplet[]): BoundingBox => {
  const dropletsX = droplets.map((droplets) => droplets.x);
  const minX = dropletsX.reduce(min, Number.MAX_VALUE) - 1;
  const maxX = dropletsX.reduce(max) + 1;
  const dropletsY = droplets.map((droplets) => droplets.y);
  const minY = dropletsY.reduce(min, Number.MAX_VALUE) - 1;
  const maxY = dropletsY.reduce(max) + 1;
  const dropletsZ = droplets.map((droplets) => droplets.x);
  const minZ = dropletsZ.reduce(min, Number.MAX_VALUE) - 1;
  const maxZ = dropletsZ.reduce(max) + 1;

  return { minX, maxX, minY, maxY, minZ, maxZ };
};

const isOutOfBounds = (
  position: Droplet,
  boundingBox: BoundingBox
): boolean => {
  return (
    position.x < boundingBox.minX ||
    position.x > boundingBox.maxX ||
    position.y < boundingBox.minY ||
    position.y > boundingBox.maxY ||
    position.z < boundingBox.minZ ||
    position.z > boundingBox.maxZ
  );
};

const isDropletContained = (
  position: Droplet,
  droplets: Droplet[]
): boolean => {
  for (let k = 0; k < droplets.length; k++) {
    if (droplets[k].equals(position)) {
      return true;
    }
  }

  return false;
};

export const day18p2 = (input: string) => {
  const droplets = input.split('\n').map(parseDroplet);
  let totalSurfaceArea = 0;
  const boundingBox = getBoundingBox(droplets);
  const analysedDroplets: Droplet[] = [];
  const positionQueue = [
    new Droplet(boundingBox.minX, boundingBox.minY, boundingBox.minZ),
  ];

  // Flood fill.
  while (positionQueue.length) {
    const currentPosition = positionQueue.pop() as Droplet;

    if (isDropletContained(currentPosition, analysedDroplets)) {
      continue;
    }

    for (let i = 0; i < adjacentChecks.length; i++) {
      const check = adjacentChecks[i];
      const checkPosition = currentPosition.add(check);

      // Out of bounds check.
      if (isOutOfBounds(checkPosition, boundingBox)) {
        continue;
      }

      // Droplet check.
      if (isDropletContained(checkPosition, droplets)) {
        totalSurfaceArea++;
        continue;
      }

      positionQueue.unshift(checkPosition);
    }

    analysedDroplets.push(currentPosition);
  }

  return totalSurfaceArea;
};

const input = getPuzzle(__dirname).input;
run(() => day18p2(input)); // 2522
