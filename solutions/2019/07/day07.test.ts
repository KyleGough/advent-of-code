import { day07p1 } from './p1';
import { day07p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, example3, input } = getPuzzle(__dirname);

describe('Day 07 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day07p1(example)).toBe(43210);
  });

  test('Part 1 Example 2', () => {
    expect(day07p1(example2)).toBe(54321);
  });

  test('Part 1 Example 3', () => {
    expect(day07p1(example3)).toBe(65210);
  });

  test('Part 1 Input', () => {
    expect(day07p1(input)).toBe(440880);
  });

  test('Part 2 Input', () => {
    expect(day07p2(input)).toBe(3_745_599);
  });
});
