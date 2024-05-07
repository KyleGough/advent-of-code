import { day25p1 } from './p1';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, input } = getPuzzle(__dirname);

describe('Day 25 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day25p1(example)).toBe(4);
    expect(day25p1(example2)).toBe(8);
  });

  test('Part 1 Input', () => {
    expect(day25p1(input)).toBe(327);
  });
});
