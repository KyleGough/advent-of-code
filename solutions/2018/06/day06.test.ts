import { day06p1 } from './p1';
import { day06p2 } from './p2';
import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { customConfig } from './customConfig';

const { example, input } = getPuzzleWithConfig(__dirname, customConfig);

describe('Day 06 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day06p1(example[0])).toBe(17);
  });

  test('Part 1 Input', () => {
    expect(day06p1(input[0])).toBe(3909);
  });

  test('Part 2 Example', () => {
    expect(day06p2(...example)).toBe(16);
  });

  test('Part 2 Input', () => {
    expect(day06p2(...input)).toBe(36238);
  });
});
