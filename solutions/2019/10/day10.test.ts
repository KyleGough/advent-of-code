import { day10p1 } from './p1';
import { day10p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, example3, input } = getPuzzle(__dirname);

describe('Day 10 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day10p1(example)).toBe(8);
  });

  test('Part 1 Example 2', () => {
    expect(day10p1(example2)).toBe(33);
  });

  test('Part 1 Example 3', () => {
    expect(day10p1(example3)).toBe(210);
  });

  test('Part 1 Input', () => {
    expect(day10p1(input)).toBe(278);
  });

  test('Part 2 Example 3', () => {
    expect(day10p2(example3)).toBe(802);
  });

  test('Part 2 Input', () => {
    expect(day10p2(input)).toBe(1417);
  });
});
