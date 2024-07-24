import { day09p1 } from './p1';
import { day09p2 } from './p2';
import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { customConfig } from './customConfig';

const { example, input } = getPuzzleWithConfig(__dirname, customConfig);

describe('Day 09 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day09p1(...example)).toBe(127);
  });

  test('Part 1 Input', () => {
    expect(day09p1(...input)).toBe(1_038_347_917);
  });

  test('Part 2 Example', () => {
    expect(day09p2(...example)).toBe(62);
  });

  test('Part 2 Input', () => {
    expect(day09p2(...input)).toBe(137_394_018);
  });
});
