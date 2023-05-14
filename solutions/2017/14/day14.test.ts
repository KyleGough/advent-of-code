import { day14p1 } from './p1';
import { day14p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 14 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day14p1(example)).toBe(8108);
  });

  test('Part 1 Input', () => {
    expect(day14p1(input)).toBe(8222);
  });

  test('Part 2 Example', () => {
    expect(day14p2(example)).toBe(1242);
  });

  test('Part 2 Input', () => {
    expect(day14p2(input)).toBe(1086);
  });
});
