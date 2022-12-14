import { day08p1 } from './p1';
import { day08p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 08 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day08p1(example)).toBe(12);
  });

  test('Part 1 Input', () => {
    expect(day08p1(input)).toBe(1371);
  });

  test('Part 2 Example', () => {
    expect(day08p2(example)).toBe(19);
  });

  test('Part 2 Input', () => {
    expect(day08p2(input)).toBe(2117);
  });
});
