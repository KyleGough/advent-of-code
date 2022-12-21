import { day18p1 } from './p1';
import { day18p2 } from './p2';
import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { customConfig } from './customConfig';
const { example, input } = getPuzzleWithConfig(__dirname, customConfig);

describe('Day 18 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day18p1(...example)).toBe(4);
  });

  test('Part 1 Input', () => {
    expect(day18p1(...input)).toBe(814);
  });

  test('Part 2 Example', () => {
    expect(day18p2(...example)).toBe(14);
  });

  test('Part 2 Input', () => {
    expect(day18p2(...input)).toBe(924);
  });
});
