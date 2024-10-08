import { day09p1 } from './p1';
import { day09p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 09 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day09p1(example)).toBe(15);
  });

  test('Part 1 Input', () => {
    expect(day09p1(input)).toBe(480);
  });

  test('Part 2 Example', () => {
    expect(day09p2(example)).toBe(1134);
  });

  test('Part 2 Input', () => {
    expect(day09p2(input)).toBe(1_045_660);
  });
});
