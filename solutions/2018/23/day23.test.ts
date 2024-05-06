import { day23p1 } from './p1';
import { day23p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, input } = getPuzzle(__dirname);

describe('Day 23 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day23p1(example)).toBe(7);
  });

  test('Part 1 Input', () => {
    expect(day23p1(input)).toBe(481);
  });

  test.skip('Part 2 Example', () => {
    expect(day23p2(example2)).toBe(36);
  });

  test.skip('Part 2 Input', () => {
    expect(day23p2(input)).toBe(47_141_479);
  });
});
