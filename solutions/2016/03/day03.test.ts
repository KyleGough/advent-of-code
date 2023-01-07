import { day03p1 } from './p1';
import { day03p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 03 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day03p1(input)).toBe(917);
  });

  test('Part 2 Input', () => {
    expect(day03p2(input)).toBe(1649);
  });
});
