import { day12p1 } from './p1';
import { day12p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, example3, input } = getPuzzle(__dirname);

describe('Day 12 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day12p1(example)).toBe(10);
  });

  test('Part 1 Example 2', () => {
    expect(day12p1(example2)).toBe(19);
  });

  test('Part 1 Example 3', () => {
    expect(day12p1(example3)).toBe(226);
  });

  test('Part 1 Input', () => {
    expect(day12p1(input)).toBe(3421);
  });

  test('Part 2 Example', () => {
    expect(day12p2(example)).toBe(36);
  });

  test('Part 2 Example 2', () => {
    expect(day12p2(example2)).toBe(103);
  });

  test('Part 2 Example 3', () => {
    expect(day12p2(example3)).toBe(3509);
  });

  test('Part 2 Input', () => {
    expect(day12p2(input)).toBe(84870);
  });
});
