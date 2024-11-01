import { day24p1 } from './p1';
import { day24p2 } from './p2';
import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { customConfig } from './customConfig';

const { example, input } = getPuzzleWithConfig(__dirname, customConfig);

describe('Day 24 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day24p1(example[0])).toBe(2_129_920);
  });

  test('Part 1 Input', () => {
    expect(day24p1(input[0])).toBe(11_042_850);
  });

  test('Part 2 Example', () => {
    expect(day24p2(...example)).toBe(99);
  });

  test('Part 2 Input', () => {
    expect(day24p2(...input)).toBe(1967);
  });
});
