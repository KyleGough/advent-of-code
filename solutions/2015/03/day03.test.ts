import { day03p1 } from './p1';
import { day03p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 03 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day03p1(example)).toBe(2);
  });

  test('Part 1 Input', () => {
    expect(day03p1(input)).toBe(2572);
  });

  test('Part 2 Example', () => {
    expect(day03p2(example)).toBe(11);
  });

  test('Part 2 Input', () => {
    expect(day03p2(input)).toBe(2631);
  });
});
