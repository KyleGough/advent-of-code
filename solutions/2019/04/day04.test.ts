import { day04p1 } from './p1';
import { day04p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 04 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day04p1(input)).toBe(2814);
  });

  test('Part 2 Input', () => {
    expect(day04p2(input)).toBe(1991);
  });
});
