import { day21p1 } from './p1';
import { day21p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 21 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day21p1(input)).toBe(208);
  });

  test('Part 2 Input', () => {
    expect(day21p2(input)).toBe(2_480_380);
  });
});
