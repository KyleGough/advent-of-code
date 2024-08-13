import { day19p1 } from './p1';
import { day19p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, input } = getPuzzle(__dirname);

describe('Day 19 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day19p1(example)).toBe(2);
  });

  test('Part 1 Example 2', () => {
    expect(day19p1(example2)).toBe(3);
  });

  test('Part 1 Input', () => {
    expect(day19p1(input)).toBe(224);
  });

  test('Part 2 Example', () => {
    expect(day19p2(example2)).toBe(12);
  });

  test('Part 2 Input', () => {
    expect(day19p2(input)).toBe(436);
  });
});
