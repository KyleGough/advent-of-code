import { day20p1 } from './p1';
import { day20p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, example3, input } = getPuzzle(__dirname);

describe('Day 20 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day20p1(example)).toBe(23);
  });

  test('Part 1 Example', () => {
    expect(day20p1(example2)).toBe(58);
  });

  test('Part 1 Input', () => {
    expect(day20p1(input)).toBe(616);
  });

  test('Part 2 Example 3', () => {
    expect(day20p2(example3)).toBe(396);
  });

  test('Part 2 Input', () => {
    expect(day20p2(input)).toBe(7498);
  });
});
