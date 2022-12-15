import { day10p1 } from './p1';
import { day10p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 10 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day10p1(example)).toBe(82350);
  });

  test('Part 1 Input', () => {
    expect(day10p1(input)).toBe(492982);
  });

  test('Part 2 Example', () => {
    expect(day10p2(example)).toBe(1166642);
  });

  test('Part 2 Input', () => {
    expect(day10p2(input)).toBe(6989950);
  });
});
