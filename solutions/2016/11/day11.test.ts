import { day11p1 } from './p1';
import { day11p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 11 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day11p1(example)).toBe(11);
  });

  test('Part 1 Input', () => {
    expect(day11p1(input)).toBe(31);
  });

  test('Part 2 Input', () => {
    expect(day11p2(input)).toBe(55);
  });
});
