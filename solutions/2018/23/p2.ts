import { getPuzzle } from '@utilities/getPuzzle';
import { max, min } from '@utilities/reduce';
import { run } from '@utilities/run';
import { matchNumbers } from '@utilities/string';

export const day23p2 = (input: string) => {
  const signals = input.split('\n').map(matchNumbers);

  const box: BoundingBox3D = {
    minX: signals.map((i) => i[0]).reduce(min, Number.MAX_SAFE_INTEGER),
    maxX: signals.map((i) => i[0]).reduce(max, Number.MIN_SAFE_INTEGER),
    minY: signals.map((i) => i[1]).reduce(min, Number.MAX_SAFE_INTEGER),
    maxY: signals.map((i) => i[1]).reduce(max, Number.MIN_SAFE_INTEGER),
    minZ: signals.map((i) => i[2]).reduce(min, Number.MAX_SAFE_INTEGER),
    maxZ: signals.map((i) => i[2]).reduce(max, Number.MIN_SAFE_INTEGER),
  };

  const optimalBoxes = subdivideBox(box, signals);

  let optimalPoints = [];
  for (let i = 0; i < optimalBoxes.length; i++) {
    optimalPoints.push(...getPointDistances(signals, optimalBoxes[i].box));
  }

  // Find and filter only points that have the maximum number of signal intersections.
  const maxCount = optimalPoints.map(({ count }) => count).reduce(max, 0);
  optimalPoints = optimalPoints
    .filter(({ count }) => count === maxCount)
    .map(({ dist }) => dist);

  // Return point with max signal intersections and least manhattan distance from origin.
  return optimalPoints.sort()[0];
};

interface PointDistance {
  count: number;
  dist: number;
}

interface BoundingBox3D {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
}

type QueueItem = {
  box: BoundingBox3D;
  count: number;
};

/**
 * Iterate over all points in a bounding box and return the number of intersecting signals and manhattan distance to the origin.
 */
const getPointDistances = (
  signals: number[][],
  box: BoundingBox3D
): PointDistance[] => {
  const optimalPoints = [];
  for (let z = box.minZ; z <= box.maxZ; z++) {
    for (let y = box.minY; y <= box.maxY; y++) {
      for (let x = box.minX; x <= box.maxX; x++) {
        const count = countPointInRange(signals, x, y, z);
        const dist = Math.abs(x) + Math.abs(y) + Math.abs(z);
        optimalPoints.push({ count, dist });
      }
    }
  }

  return optimalPoints;
};

/**
 * Counts the number of signals are in range of a given point.
 */
const countPointInRange = (
  signals: number[][],
  x: number,
  y: number,
  z: number
): number => {
  let count = 0;

  for (const signal of signals) {
    const dx = Math.abs(x - signal[0]);
    const dy = Math.abs(y - signal[1]);
    const dz = Math.abs(z - signal[2]);
    if (dx + dy + dz <= signal[3]) {
      count += 1;
    }
  }

  return count;
};

/**
 * Counts the number of signals which intersect with a bounding box.
 */
const boxIntersections = (signals: number[][], box: BoundingBox3D): number => {
  let count = 0;
  for (const [x, y, z, dist] of signals) {
    let dx = 0;
    let dy = 0;
    let dz = 0;

    // Find x distance.
    if (x < box.minX) {
      dx = Math.abs(x - box.minX);
    } else if (x > box.maxX) {
      dx = Math.abs(x - box.maxX);
    }

    // Find y distance.
    if (y < box.minY) {
      dy = Math.abs(y - box.minY);
    } else if (y > box.maxY) {
      dy = Math.abs(y - box.maxY);
    }

    // Find z distance.
    if (z < box.minZ) {
      dz = Math.abs(z - box.minZ);
    } else if (z > box.maxZ) {
      dz = Math.abs(z - box.maxZ);
    }

    if (dx + dy + dz <= dist) {
      count += 1;
    }
  }
  return count;
};

/**
 * Finds the theoretical minimum and maximum distances from the origin.
 */
const findBoxMinMax = (box: BoundingBox3D) => {
  let sx = 0;
  let sy = 0;
  let sz = 0;

  if (box.minX < 0 || box.maxX > 0) {
    sx = Math.min(Math.abs(box.minX), Math.abs(box.maxX));
  }

  if (box.minY < 0 || box.maxY > 0) {
    sy = Math.min(Math.abs(box.minY), Math.abs(box.maxY));
  }

  if (box.minZ >= 0 && box.maxZ <= 0) {
    sz = 0;
  } else {
    sz = Math.min(Math.abs(box.minZ), Math.abs(box.maxZ));
  }

  const maxDistX = Math.max(Math.abs(box.minX), Math.abs(box.maxX));
  const maxDistY = Math.max(Math.abs(box.minY), Math.abs(box.maxY));
  const maxDistZ = Math.max(Math.abs(box.minZ), Math.abs(box.maxZ));

  return {
    minDist: sx + sy + sz,
    maxDist: maxDistX + maxDistY + maxDistZ,
  };
};

/**
 * Repeatedly sub-divide the bounding box to find the areas of maximum signal intersection.
 */
const subdivideBox = (globalBox: BoundingBox3D, signals: number[][]) => {
  let currentQueue: QueueItem[] = [{ box: globalBox, count: 0 }];

  const width = Math.abs(globalBox.maxX - globalBox.minX);
  const height = Math.abs(globalBox.maxY - globalBox.minY);
  const depth = Math.abs(globalBox.maxZ - globalBox.minZ);
  const iterations = Math.floor(
    Math.log(Math.min(width, height, depth)) / Math.log(3)
  );

  for (let i = 0; i < iterations; i++) {
    const candidates: QueueItem[] = [];
    for (const { box } of currentQueue) {
      const x3 = (box.maxX - box.minX) / 3;
      const y3 = (box.maxY - box.minY) / 3;
      const z3 = (box.maxZ - box.minZ) / 3;

      const getX = (n: number) => Math.floor(box.minX + n * x3);
      const getY = (n: number) => Math.floor(box.minY + n * y3);
      const getZ = (n: number) => Math.floor(box.minZ + n * z3);

      // Sub-divide the bounding box into 27 sub-boxes.
      const subBoxes: BoundingBox3D[] = [];
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          for (let z = 0; z < 3; z++) {
            subBoxes.push({
              minX: getX(x),
              maxX: getX(x + 1),
              minY: getY(y),
              maxY: getY(y + 1),
              minZ: getZ(z),
              maxZ: getZ(z + 1),
            });
          }
        }
      }

      const intersectionCounts = subBoxes.map((b) => ({
        box: b,
        count: boxIntersections(signals, b),
      }));

      candidates.push(...intersectionCounts);
    }

    // Filter boxes with max counts.
    const maxCount = candidates.map(({ count }) => count).reduce(max, 0);
    const maxCountBoxes = candidates.filter(({ count }) => count === maxCount);

    // Add minimum possible distance and max possible distances.
    const distanceBoxes = maxCountBoxes.map(({ box, count }) => ({
      box,
      count,
      ...findBoxMinMax(box),
    }));

    // Find the minimum of the maximum distances.
    const minMaxDistance = distanceBoxes
      .map(({ maxDist }) => maxDist)
      .reduce(min, Number.MAX_SAFE_INTEGER);

    // Remove boxes that have a minimum distance greater than the smallest maximum distance.
    currentQueue = distanceBoxes.filter(
      ({ minDist }) => minDist <= minMaxDistance
    );
  }

  return currentQueue;
};

const input = getPuzzle(__dirname).input;
run(() => day23p2(input)); // 47141479
