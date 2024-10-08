import { day04p1 } from './p1';
import { day04p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 04 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day04p1(example)).toBe(4512);
  });

  test('Part 1 Input', () => {
    expect(day04p1(input)).toBe(69579);
  });

  test('Part 2 Example', () => {
    expect(day04p2(example)).toBe(1924);
  });

  test('Part 2 Input', () => {
    expect(day04p2(input)).toBe(14877);
  });
});
