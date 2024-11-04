import { day14p1 } from './p1';
import { day14p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, example3, input } = getPuzzle(__dirname);

describe('Day 14 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day14p1(example)).toBe(13312);
  });

  test('Part 1 Example 2', () => {
    expect(day14p1(example2)).toBe(180697);
  });

  test('Part 1 Example 3', () => {
    expect(day14p1(example3)).toBe(2_210_736);
  });

  test('Part 1 Input', () => {
    expect(day14p1(input)).toBe(397771);
  });

  test('Part 2 Example', () => {
    expect(day14p2(example)).toBe(82_892_753);
  });

  test('Part 2 Example 2', () => {
    expect(day14p2(example2)).toBe(5_586_022);
  });

  test('Part 2 Example 3', () => {
    expect(day14p2(example3)).toBe(460664);
  });

  test('Part 2 Input', () => {
    expect(day14p2(input)).toBe(3_126_714);
  });
});
