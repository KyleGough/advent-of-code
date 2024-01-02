import { day21p1 } from './p1';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 21 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day21p1(input)).toBe(3637);
  });
});
