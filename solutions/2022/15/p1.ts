import { getPuzzleWithCustomInput } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customInput } from './customInput';
import { parseSensor, getInvalidRanges } from './day15.helper';

export const day15p1 = (input: string, testRow: number) => {
  const sensors = input.split('\n').map(parseSensor);
  return getInvalidRanges(sensors, testRow)
    .map((i) => i[1] - i[0])
    .reduce((prev, curr) => prev + curr, 0);
};

const input = getPuzzleWithCustomInput(__dirname, customInput).input;
run(() => day15p1(...input)); // 4717631
