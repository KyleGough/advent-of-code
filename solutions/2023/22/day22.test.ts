import { day22p1 } from './p1';
import { day22p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 22 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day22p1(example)).toBe(5);
  });

  test('Part 1 Input', () => {
    expect(day22p1(input)).toBe(530);
  });

  test('Part 2 Example', () => {
    expect(day22p2(example)).toBe(7);
  });

  test('Part 2 Input', () => {
    expect(day22p2(input)).toBe(93292);
  });
});
