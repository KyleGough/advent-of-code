import { day12p1 } from './p1';
import { day12p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 12 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day12p1(example)).toBe(325);
  });

  test('Part 1 Input', () => {
    expect(day12p1(input)).toBe(1733);
  });

  test('Part 2 Example', () => {
    expect(day12p2(example)).toBe(50_000_000_501);
  });

  test('Part 2 Input', () => {
    expect(day12p2(input)).toBe(1_000_000_000_508);
  });
});
