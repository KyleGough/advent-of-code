import { day01p1 } from './p1';
import { day01p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 01 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day01p1(input)).toBe(1251);
  });

  test('Part 2 Input', () => {
    expect(day01p2(input)).toBe(1244);
  });
});
