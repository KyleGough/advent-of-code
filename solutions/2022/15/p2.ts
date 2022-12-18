import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customInput } from './customInput';
import { parseSensor, getInvalidRanges } from './day15.helper';

const getTuningFrequency = (x: number, y: number): number => 4_000_000 * x + y;

// Restrict ranges to 0 - max.
const restrictRange = (range: number[], max: number): number[] => {
  return [Math.max(0, range[0]), Math.min(max, range[1])];
};

// Gets the x position of the distress beacon given ranges.
const getBeaconXPosition = (ranges: number[][], maxX: number): number => {
  for (let i = 0; i < ranges.length; i++) {
    if (ranges[i][0] > 0) {
      return ranges[i][0] - 1;
    } else if (ranges[i][1] < maxX) {
      return ranges[i][1] + 1;
    }
  }
  return 0;
};

export const day15p2 = (input: string, testRow: number) => {
  const maxSize = testRow * 2;
  const sensors = input.split('\n').map(parseSensor);
  for (let y = 0; y <= maxSize; y++) {
    const invalidRanges = getInvalidRanges(sensors, y).map((range) =>
      restrictRange(range, maxSize)
    );

    const invalidPositionCount = invalidRanges
      .map((range) => range[1] - range[0] + 1)
      .reduce((prev, curr) => prev + curr, 0);

    if (invalidPositionCount < maxSize + 1) {
      const x = getBeaconXPosition(invalidRanges, maxSize);
      return getTuningFrequency(x, y);
    }
  }
};

const input = getPuzzleWithConfig(__dirname, customInput).input;
run(() => day15p2(...input)); // 13197439355220
