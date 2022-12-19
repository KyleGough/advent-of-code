import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { customConfig } from './customConfig';
import { parseSensor, getInvalidRanges } from './day15.helper';

export const day15p1 = (input: string, testRow: number) => {
  const sensors = input.split('\n').map(parseSensor);
  return getInvalidRanges(sensors, testRow)
    .map((i) => i[1] - i[0])
    .reduce(sum);
};

const input = getPuzzleWithConfig(__dirname, customConfig).input;
run(() => day15p1(...input)); // 4717631
