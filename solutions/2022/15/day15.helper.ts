interface Position {
  x: number;
  y: number;
}

interface Sensor {
  position: Position;
  beacon: Position;
  beaconDistance: number;
}

// Determines if two ranges satisfy any of the following:
// - Overlap, e.g. (0,10) and (5,20)
// - Fully Contained, e.g. (0,10) and (2,4)
// - Adjacent, e.g. (0,4) and (5,8)
const isOverlap = (first: number[], second: number[]) => {
  return (
    (second[0] - 1 <= first[1] && second[1] >= first[0]) ||
    (first[0] - 1 <= second[1] && first[1] >= second[0])
  );
};

export const getInvalidRanges = (sensors: Sensor[], y: number) => {
  const beaconRanges: number[][] = [];

  // Get raw invalid beacon ranges.
  for (let i = 0; i < sensors.length; i++) {
    const range = getBeaconRange(sensors[i], y);
    if (range) beaconRanges.push(range);
  }

  const finalRanges = [];
  let merged: boolean;
  let currentRanges = beaconRanges;

  // Merges ranges that overlap.
  while (currentRanges.length > 1) {
    const nextRanges = [];
    const rangeA = currentRanges.shift() as number[];
    merged = false;

    while (currentRanges.length) {
      const rangeB = currentRanges.shift() as number[];

      if (isOverlap(rangeA, rangeB)) {
        // Merge ranges.
        nextRanges.push([
          Math.min(rangeA[0], rangeB[0]),
          Math.max(rangeA[1], rangeB[1]),
        ]);
        merged = true;
      } else {
        nextRanges.push(rangeB);
      }
    }

    // Range doesn't overlap with any other range.
    if (!merged) {
      finalRanges.push(rangeA);
    }

    currentRanges = nextRanges;
  }

  return finalRanges.concat(currentRanges);
};

// Get range along x-axis that satisfy invalid beacon positions for a given sensor and y coordinate.
const getBeaconRange = (sensor: Sensor, y: number): number[] | undefined => {
  const maxHorizontalDistance =
    sensor.beaconDistance - Math.abs(sensor.position.y - y);

  if (maxHorizontalDistance < 0) return;

  const minX = sensor.position.x - maxHorizontalDistance;
  const maxX = sensor.position.x + maxHorizontalDistance;
  return [minX, maxX];
};

export const parseSensor = (input: string): Sensor => {
  const match = input.match(
    /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
  ) as RegExpMatchArray;

  const position: Position = {
    x: parseInt(match[1]),
    y: parseInt(match[2]),
  };
  const beacon: Position = {
    x: parseInt(match[3]),
    y: parseInt(match[4]),
  };

  return {
    position,
    beacon,
    beaconDistance: getManhattanDistance(position, beacon),
  };
};

const getManhattanDistance = (source: Position, destination: Position) =>
  Math.abs(source.x - destination.x) + Math.abs(source.y - destination.y);
