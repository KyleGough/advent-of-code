import { day14p1 } from './p1';
import { day14p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 14 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day14p1(example)).toBe(1588);
  });

  test('Part 1 Input', () => {
    expect(day14p1(input)).toBe(3247);
  });

  test('Part 2 Example', () => {
    expect(day14p2(example)).toBe(2_188_189_693_529);
  });

  test('Part 2 Input', () => {
    expect(day14p2(input)).toBe(4_110_568_157_153);
  });
});
