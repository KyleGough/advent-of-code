import { day23p1 } from './p1';
import { day23p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 23 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day23p1(example)).toBe(110);
  });

  test('Part 1 Input', () => {
    expect(day23p1(input)).toBe(3815);
  });

  test('Part 2 Example', () => {
    expect(day23p2(example)).toBe(20);
  });

  test('Part 2 Input', () => {
    expect(day23p2(input)).toBe(893);
  });
});
