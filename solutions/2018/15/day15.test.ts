import { day15p1 } from './p1';
import { day15p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 15 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day15p1(example)).toBe(18740);
  });

  test('Part 1 Input', () => {
    expect(day15p1(input)).toBe(214731);
  });

  test('Part 2 Example', () => {
    expect(day15p2(example)).toBe(1140);
  });

  test('Part 2 Input', () => {
    expect(day15p2(input)).toBe(53222);
  });
});
