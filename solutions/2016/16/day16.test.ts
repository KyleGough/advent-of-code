import { day16p1 } from './p1';
import { day16p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 16 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day16p1(input)).toBe('10100101010101101');
  });

  test('Part 2 Input', () => {
    expect(day16p2(input)).toBe('01100001101101001');
  });
});
