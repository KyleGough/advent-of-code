import { day09p1 } from './p1';
import { day09p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 09 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day09p1(input)).toBe(150914);
  });

  test('Part 2 Input', () => {
    expect(day09p2(input)).toBe(11_052_855_125);
  });
});
