import { day20p1 } from './p1';
import { day20p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 20 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day20p1(example)).toBe(20_899_048_083_289);
  });

  test('Part 1 Input', () => {
    expect(day20p1(input)).toBe(13_983_397_496_713);
  });

  test('Part 2 Example', () => {
    expect(day20p2(example)).toBe(273);
  });

  test('Part 2 Input', () => {
    expect(day20p2(input)).toBe(2424);
  });
});
