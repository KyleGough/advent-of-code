import { day02p1 } from './p1';
import { day02p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 02 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day02p1(input)).toBe(32_121);
  });

  test('Part 2 Input', () => {
    expect(day02p2(input)).toBe(197);
  });
});
