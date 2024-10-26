import { day22p1 } from './p1';
import { day22p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, example3, input } = getPuzzle(__dirname);

describe('Day 22 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day22p1(example)).toBe(39);
  });

  test('Part 1 Example 2', () => {
    expect(day22p1(example2)).toBe(590784);
  });

  test('Part 1 Input', () => {
    expect(day22p1(input)).toBe(582644);
  });

  test('Part 2 Example 3', () => {
    expect(day22p2(example3)).toBe(2_758_514_936_282_235);
  });

  test('Part 2 Input', () => {
    expect(day22p2(input)).toBe(1_263_804_707_062_415);
  });
});
