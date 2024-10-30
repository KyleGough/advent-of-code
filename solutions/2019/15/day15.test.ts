import { day15p1 } from './p1';
import { day15p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 15 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day15p1(input)).toBe(262);
  });

  test('Part 2 Input', () => {
    expect(day15p2(input)).toBe(314);
  });
});
