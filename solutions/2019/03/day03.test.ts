import { day03p1 } from './p1';
import { day03p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, input } = getPuzzle(__dirname);

describe('Day 03 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day03p1(example)).toBe(159);
  });

  test('Part 1 Example 2', () => {
    expect(day03p1(example2)).toBe(135);
  });

  test('Part 1 Input', () => {
    expect(day03p1(input)).toBe(245);
  });

  test('Part 2 Example', () => {
    expect(day03p2(example)).toBe(610);
  });

  test('Part 2 Example 2', () => {
    expect(day03p2(example2)).toBe(410);
  });

  test('Part 2 Input', () => {
    expect(day03p2(input)).toBe(48262);
  });
});
