import { day25p1 } from './p1';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 25 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day25p1(input)).toBe(2_650_453);
  });
});
