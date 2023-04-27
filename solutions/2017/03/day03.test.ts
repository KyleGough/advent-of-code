import { day03p1 } from './p1';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 03 Puzzle', () => {
  test('Part 1 Examples', () => {
    expect(day03p1(1)).toBe(0);
    expect(day03p1(12)).toBe(3);
    expect(day03p1(23)).toBe(2);
    expect(day03p1(1024)).toBe(31);
  });

  test('Part 1 Input', () => {
    expect(day03p1(input)).toBe(438);
  });
});
