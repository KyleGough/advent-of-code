import { day23p1 } from './p1';
import { day23p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 23 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day23p1(input)).toBe(3969);
  });

  test('Part 2 Input', () => {
    expect(day23p2(input)).toBe(917);
  });
});
