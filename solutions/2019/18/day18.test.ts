import { day18p1 } from './p1';
import { day18p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, example3, input } = getPuzzle(__dirname);

describe('Day 18 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day18p1(example)).toBe(132);
  });

  test('Part 1 Example 2', () => {
    expect(day18p1(example2)).toBe(136);
  });

  test('Part 1 Example 3', () => {
    expect(day18p1(example3)).toBe(81);
  });

  test('Part 1 Input', () => {
    expect(day18p1(input)).toBe(3646);
  });

  test('Part 2 Input', () => {
    expect(day18p2(input)).toBe(1730);
  });
});
