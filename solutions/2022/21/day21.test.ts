import { day21p1 } from './p1';
import { day21p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 21 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day21p1(example)).toBe(152);
  });

  test('Part 1 Input', () => {
    expect(day21p1(input)).toBe(157_714_751_182_692);
  });

  test('Part 2 Example', () => {
    expect(day21p2(example)).toBe(301);
  });

  test('Part 2 Input', () => {
    expect(day21p2(input)).toBe(3_373_767_893_067);
  });
});
