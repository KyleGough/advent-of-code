import { day18p1 } from './p1';
import { day18p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 18 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day18p1(input)).toBe(1956);
  });

  test('Part 2 Input', () => {
    expect(day18p2(input)).toBe(19_995_121);
  });
});
