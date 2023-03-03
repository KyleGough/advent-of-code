import { day07p1 } from './p1';
import { day07p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 07 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day07p1(input)).toBe(110);
  });

  test('Part 2 Input', () => {
    expect(day07p2(input)).toBe(242);
  });
});
