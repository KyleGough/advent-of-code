import { day10p1 } from './p1';
import { day10p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 10 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day10p1(input)).toBe(9656);
  });

  test('Part 2 Input', () => {
    expect(day10p2(input)).toBe('20b7b54c92bf73cf3e5631458a715149');
  });
});
