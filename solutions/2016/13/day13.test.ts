import { day13p1 } from './p1';
import { day13p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 13 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day13p1(input)).toBe(86);
  });

  test('Part 2 Input', () => {
    expect(day13p2(input)).toBe(127);
  });
});
